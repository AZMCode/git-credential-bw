import assert from "assert"
import { isProp } from "./utils"
import { flagDefs } from "./flags"


type flags = Record<keyof typeof flagDefs,boolean>

const flagBools: flags = {} as flags
for(const key of Object.keys(flagDefs)){
	assert(isProp(flagDefs,key))
	flagBools[key] = false
}

interface parsedArgs{
	command: string | undefined
	flags:flags
}
//Unknown flags are ignored
function parseShortFlag(input:string):Partial<flags>{
	const availableFlags:[string,string][] = [];
	const flags:Partial<flags> = {}
	for(const flag of Object.entries(flagDefs)){
		if(flag[0].match(/^-[^-]$/)){
			availableFlags.push([flag[0],flag[1][0].slice(1)]);
		}
	}
	const inputArr = input.split("");
	inputArr.shift();
	for(const letter of inputArr){
		const indexMatch = availableFlags.map((e)=>(e[1])).indexOf(letter);
		if(indexMatch > 0){
			const foundFlag = availableFlags[indexMatch][0];
			assert(isProp(flagDefs,foundFlag));
			flags[foundFlag] = true;
		}
	}
	return flags;
}
function parseLongFlag(input: string):Partial<flags>{
	const availableFlags:[string,string][] = [];
	const flags:Partial<flags> = {}
	for(const flag of Object.entries(flagDefs)){
		if(flag[0].match(/^--[^-]+$/)){
			assert(flag[1][1]);
			availableFlags.push([flag[0],flag[1][1].slice(1)]);
		}
	}
	const argMatch = availableFlags.map((e)=>(e[1])).indexOf(input);
	if(argMatch > 0){
		const flagName = availableFlags[argMatch][0];
		assert(isProp(flagDefs,flagName));
		flags[flagName] = true;
	}
	return flags;
}
export default function parseArgs():parsedArgs{
	const argArr = process.argv.slice(1);
	let command:string|undefined = undefined;
	let flags: Partial<flags> = {};
	//Parse Arguments
	for(const arg of argArr){
		switch(true){
			case !!arg.match(/^-[^-]/):
				flags = {...flags,...parseShortFlag(arg)}
				break;
			case !!arg.match(/^--[^-]/):
				flags = {...flags,...parseLongFlag(arg)}
				break;
			default:
				if(!command){
					command = arg
				}
		}
	}
	const fullFlags = {...flagBools,...flags}
	return {command, flags:fullFlags}
}
