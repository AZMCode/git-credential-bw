import { FlashStore } from "flash-store"
import { spawn } from "cross-spawn"
import timeout from "./timeout"
import assert from "assert"
import toString from "stream-to-string";
import {PassThrough} from "stream"
import path from "path"
import util from "util"
import { getTimeout } from "./config"
import DeleteEcho from "./deleteEcho"
import fs from "fs"
import tty from "tty"

async function getControllingTTY():Promise<tty.ReadStream>{
	let ttyFilepath = ""
	switch(process.platform){
		case "darwin":
			ttyFilepath = "/dev/tty"
			break
		case "win32":
			ttyFilepath = "CON:"
			break
		case "android":
			ttyFilepath = "/dev/tty"
			break
		case "linux":
			ttyFilepath = "/dev/tty"
			break
	}
	if(ttyFilepath === ""){
		throw new Error(`Sorry, this program currently doesn't have support for ${process.platform}`);
	}
	const controllingFd = await util.promisify(fs.open)(ttyFilepath,'r');
	const controllingTTY = new tty.ReadStream(controllingFd,{})
	assert(controllingTTY.isTTY)
	controllingTTY.setRawMode(true);
	controllingTTY.on('close',()=>{
		fs.close(controllingFd,(err)=>{
			if(err){throw err}
		})
	});
	return controllingTTY
}


type bwStatus = "unauthenticated"|"locked"|"unlocked"

async function runPiped(args:string[]):Promise<string>{
	const proc = spawn("bw",args,{stdio: "pipe"});
	proc.stderr.pipe(process.stderr);
	const pipeToDelete = new PassThrough();
	const pipeToStdin = new PassThrough();
	(await getControllingTTY()).pipe(pipeToDelete);
	(await getControllingTTY()).pipe(pipeToStdin);
	const echoDeleter = new DeleteEcho();
	pipeToDelete.pipe(echoDeleter)
	echoDeleter.pipe(process.stderr)
	pipeToStdin.pipe(proc.stdin)
	const bwOut = await toString(proc.stdout)
	return bwOut
}

const getBwStatus = async (store:FlashStore<string>):Promise<bwStatus>=>{
	const key = await store.get("sessionKey");
	let args:string[] = [];
	if(key){
		args = ["status"]
	} else {
		args = ["status","--session",key as string];
	}
	const bwOut = await runPiped(args)
	const parsedBwMatch = bwOut.match(/^[^{]*({.*)$/);
	assert(parsedBwMatch !== null)
	const parsedBwOut = parsedBwMatch[1]
	assert(typeof parsedBwOut === "string")
	const status = JSON.parse(parsedBwOut).status;
	assert(status === "unauthenticated" || status === "locked" || status === "unlocked")
	return status as bwStatus
}
const login = async(tryNum: number)=>{
	console.error(`You are currently unauthenticated in BW, please log in (${tryNum}/5):`);
	await runPiped(["login"])
}
const unlock = async (tryNum: number):Promise<string>=>{
	console.error(`The vault is currently locked. Please unlock (${tryNum}/5):`);
	const out = await runPiped(["unlock","--raw"])
	return out;
}
const getCredentials = async(input: string,sessKey:string|undefined):Promise<Map<string,string>>=>{
	assert(sessKey);
	const credentialsProc = spawn("bw",["get","item",input,"--session",sessKey],{stdio: "pipe"});
	const credentialsStr = await toString(credentialsProc.stdout)
	const credentials = JSON.parse(credentialsStr);
	assert(credentials.login);
	const username = credentials.login.username
	const password = credentials.login.password
	assert(typeof username === "string")
	assert(typeof password === "string")
	return new Map([["username",username],["password",password]]);
}
export default async (input: string|undefined):Promise<Map<string,string>|undefined>=>{
	const sessionStore = new FlashStore<string>(path.resolve(__dirname,"..","sessionStore"));
	let tryCount = 5
	const currStatus = await getBwStatus(sessionStore);
	for(; currStatus !== "unlocked" && tryCount > 0; tryCount--){
		switch(currStatus){
			case "unauthenticated":
				await login(tryCount)
				break;
			case "locked":
				await sessionStore.set("sessionKey",await unlock(tryCount));
				await sessionStore.set("timeout",Math.floor(await getTimeout()/1000).toString())
				if(!await sessionStore.get("timeoutIsActive")){
					await timeout()
					await sessionStore.set("timeoutIsActive","true")
				}

				break;
		}
	}
	if( currStatus === "unlocked"){
		if(input){
			return await getCredentials(input,await sessionStore.get("sessionKey"))
		} else {
			return await getCredentials("git",await sessionStore.get("sessionKey"))
		}
	} else {
		console.error("Could not authenticate with Bitwarden. Exiting.");
		return undefined;
	}
}
