/**
 * Ensures bw lock is run after a specific timeout or on shutdown, whichever comes sooner
 * @packageDocumentation
 */
import { spawn } from "cross-spawn"
import path from "path"
import { getTimeout } from "./config"
import delay from "delay"
import { LocalStorage } from "node-localstorage"

export default async function run(isDetached?:boolean):Promise<void>{
	if(isDetached){
		const store = new LocalStorage(path.resolve(__dirname,"..","sessionStore"));
		//Run stuff to make stuff happen
		process.on('exit',()=>{
			spawn("bw",["lock"],{detached:true});
			store.setItem("timeoutIsActive","");
		});
		while(true){ // eslint-disable-line no-constant-condition
			await delay(10000);

			const currTimestamp = Math.floor(Date.now()/1000)
			const currTimeout = parseInt(String(store.getItem("timeout")));

			if( currTimeout <= currTimestamp){
				break;
			}

		}
	} else {
		const proc = spawn("node",[path.resolve(__dirname,__filename)],{detached: true});
		proc.unref();
	}
}
(async ()=>{
	if(require.main === module){
		if(await getTimeout() >= 0){
			run(true);
		}
	}
})()
