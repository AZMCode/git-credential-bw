import assert from "assert"
import getStdin from "get-stdin"

import parseArgs from "./parseArgs"
import commands from "./commands"
import flags from "./flags"
import {mapToString,lgDetsToMap} from "./gitIO"
import { isProp } from "./utils"
module.exports = (async()=>{
	debugger; //eslint-disable-line no-debugger
	const args = parseArgs();
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
				const command = await commands[commandName]
				const stdin = await getStdin()
				const results = await command(stdin);
				const resultsMap = lgDetsToMap(results);
				const resultsStr = mapToString(resultsMap);
				console.log(resultsStr);
			}
		} else {
			await flags.usage()
		}
	}
})()
