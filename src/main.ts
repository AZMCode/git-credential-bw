#!/usr/bin/env node
import assert from "assert"
import getStdin from "get-stdin"

import parseArgs from "./parseArgs"
import commands from "./commands"
import flags from "./flags"
import { mapToString } from "./gitIO"
import { isProp } from "./utils"
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
	debugger
	if(!flagRan){
		if(args.command){
			const commandName = args.command;
			if(isProp(commands,commandName)){
				const command = commands[commandName]
				const stdin = await getStdin()
				const results = await command(stdin);
				const resultsStr = mapToString(results);
				console.log(resultsStr);
			}
		} else {
			await flags.usage()
		}
	}
})()
