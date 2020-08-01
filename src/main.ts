import parseArgs from "./parseArgs"
import commands from "./commands"
import assert from "assert"
import config from "./config"
import { isProp } from "./utils"
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
				const resultscommand()
			}
		} catch(e){
			console.error("Fatal error, terminating:")
			console.error(e);
		}
}
