#!/usr/bin/env node
import assert from "assert"

import parseArgs from "./parseArgs"
import commands from "./commands"
import flags from "./flags"
import { mapToString } from "./gitIO"
import { isProp } from "./utils"
import pEvent from "p-event"

module.exports = (async()=>{
	debugger
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
			debugger
			if(isProp(commands,commandName)){
				debugger
				const command = commands[commandName]
				let stdin = "";
				try{
					while(!stdin.match(/\nhost=[^\n]*\n/)){
						stdin += await pEvent(process.stdin,'data',{rejectionEvents: ["close","error"]}) + "\n"
					}
				} catch(e){
					stdin = ""
				}
				process.stdin.pause();
				process.stdin.pause();
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
