import { stdout } from "process"
import assert from "assert"
import getStdin from "get-stdin"

import parseArgs from "./parseArgs"
import { commands } from "./commands"
import config from "./config"
import {mapToString,lgDetsToMap} from "./gitIO"
import { isProp } from "./utils"
module.exports = (async()=>{
	const args = parseArgs();
	switch(true){
		case args.config:
			config();
			break;
		default:
			try{
				const commandName = args.command[0] as keyof typeof commands;
				if(isProp(commands,commandName)){
					const command = commands[commandName]
					assert(command instanceof Function);
					const stdin = await getStdin()
					const results = command(stdin);
					const resultsMap = lgDetsToMap(results);
					const resultsStr = mapToString(resultsMap);
					stdout.write(resultsStr);
				}
			} catch(e){
				console.error("Fatal error, terminating:")
				console.error(e);
			}
	}
})()
