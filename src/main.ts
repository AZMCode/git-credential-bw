#!/usr/bin/env node
import assert from "assert"

import parseArgs from "./parseArgs"
import commands from "./commands"
import flags from "./flags"
import { mapToString } from "./gitIO"
import { isProp } from "./utils"
import byline from "byline"
import pEvent from "p-event"
module.exports = (async()=>{
	const args = parseArgs(process.argv);
	let flagRan = false;
	for(const key of Object.keys(args.flags)){
		assert(isProp(flags,key));
		if(args.flags[key] === true){
			await flags[key]()
			flagRan = true
			break
		}
	}
	if(!flagRan){
		if(args.command){
			const commandName = args.command;
			if(isProp(commands,commandName)){
				const command = commands[commandName]
				let stdin = "";
				const reader = byline(process.stdin);
				try{
					while(!stdin.match(/\nhost=[^\n]*\n/)){
						stdin += await pEvent(reader,'data',{rejectionEvents: ["close","error"]}) + "\n"
					}
				} catch {
					console.error("Input cut off unexpectedly from Git");
					stdin = ""
				}
				reader.destroy()
				const results = await command(stdin);
				if(results){
					const resultsStr = mapToString(results);
					console.log(resultsStr);
				}
			}
		} else {
			await flags.usage()
		}
	}
})()
