import { spawn } from "cross-spawn"
import toString from "stream-to-string"
import assert from "assert"
export async function getTimeout():Promise<number>{
	const defaultVal = 900;
	const timeoutProc = spawn("git",["config","--get","credential.helper.bw.timeout"],{stdio: "pipe"})
	const timeoutStr = await toString(timeoutProc.stdout);
	let timeoutVal:number = 0;
	try{
		timeoutVal = parseInt(timeoutStr);
		assert(!Number.isNaN(timeoutVal))
		assert(timeoutVal === -1 || timeoutVal > 0)
	} catch {
		timeoutVal = defaultVal
		console.error(`No/Invalid session disk cache timeout has been configured. Please configure running 'git config credential.helper.bw.timeout <Time in seconds>' using -1 for clear on reboot. Default value of ${900} used.`)
	}
	return timeoutVal;
}
