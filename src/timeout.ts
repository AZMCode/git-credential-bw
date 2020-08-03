/**
 * Ensures bw lock is run after a specific timeout or on shutdown, whichever comes sooner
 * @packageDocumentation
 */
import { spawn } from "cross-spawn"
import path from "path"
import { getTimeout } from "./config"
import delay from "delay"
import { FlashStore, FlashStoreSync } from "flash-store"

export default async function run(isDetached?:boolean):Promise<void>{
	if(isDetached){
		//Run stuff to make stuff happen
		process.on('exit',()=>{
			spawn("bw",["lock"],{detached:true});
			const store = new FlashStoreSync<string>(path.resolve(__dirname,"..","sessionStore"));
			store.set("timeoutIsActive","");
		});
		while(true){
			await delay(10000);
			const store = new FlashStore<string>(path.resolve(__dirname,"..","sessionStore"));
			const currTimestamp = Math.floor(Date.now()/1000)
			if(parseInt(String(await store.get("timeout"))) <= currTimestamp){
				break;
			}

		}
	} else {
		const process = spawn("node",[path.resolve(__dirname,__filename)],{detached: true});
	}
}
(async ()=>{
	if(require.main === module){
	 	if(await getTimeout() >= 0){
		 	run(true);
		}
	}
})()
