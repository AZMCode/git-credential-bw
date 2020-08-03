import { FlashStore } from "flash-store"
import { spawn } from "cross-spawn"
import timeout from "./timeout"
import assert from "assert"
import toString from "stream-to-string";
import path from "path"
import { getTimeout } from "./config"

type bwStatus = "unauthenticated"|"locked"|"unlocked"
const getBwStatus = async (store:FlashStore<string>):Promise<bwStatus>=>{
	const key = await store.get("sessionKey");
	let args:string[] = [];
	if(key){
		args = ["status"]
	} else {
		args = ["status","--session",key as string];
	}
	const statusProc = spawn("bw",["status"],{stdio: "pipe"});
	const bwOut = await toString(statusProc.stdout)
	const status = JSON.parse(bwOut).status;
	assert(status === "unauthenticated" || status === "locked" || status === "unlocked")
	return status as bwStatus
}
const login = async()=>{
	console.error("You are currently unauthenticated in BW, please log in:")
}
const unlock = async():Promise<string>=>{
	console.error("The vault is currently locked. Please unlock.")
}
const getCredentials = async(input: string,sessKey:string|undefined):Promise<Map<string,string>>=>{
	assert(sessKey);
	const credentialsProc = spawn("bw",["get","item",input,"--session",sessKey],{stdio: "pipe"});
	const credentials = JSON.parse(await toString(credentialsProc.stdout));
	assert(credentials.login);
	const username = credentials.login.username
	const password = credentials.login.password
	assert(typeof username === "string")
	assert(typeof password === "string")
	return new Map([["username",username],["password",password]]);
}
export default async (input: string|undefined):Promise<Map<string,string>>=>{
	const sessionStore = new FlashStore<string>(path.resolve(__dirname,"..","sessionStore"));
	for(const currStatus = await getBwStatus(sessionStore); currStatus !== "unlocked";){
		switch(currStatus){
			case "unauthenticated":
				await login()
				break;
			case "locked":
				const sessionKey = await unlock()
				sessionStore.set("sessionKey",sessionKey);
				sessionStore.set("timeout",Math.floor(await getTimeout()/1000).toString())
				if(!sessionStore.get("timeoutIsActive")){
					await timeout()
					sessionStore.set("timeoutIsActive","true")
				}

				break;
		}
	}
	if(input){
		return await getCredentials(input,await sessionStore.get("sessionKey"))
	} else {
		return await getCredentials("git",await sessionStore.get("sessionKey"))
	}
}
