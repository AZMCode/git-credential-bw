/* istanbul ignore file */
import * as pkgInfo from "./pkgInfo.json"
import config from "./flags/config"
import { promises as fs } from "fs"
import path from "path"
/**
 * Aggregates all FlagFns. See [Flags & Commands](/pages/Guides/development/flagscommands.html)
 * Also takes care of defining which flags are available in the command line through the flagDefs export
 * @packageDocumentation
 */

export const flagDefs = {
	config: ["-c","--config","Configures Git to use this helper globally"],
	version: ["-v","--version","Shows the program version and exits"],
	help: ["-h","--help","Shows help on command line arguments and usage."],
	usage: ["","--usage","Shows usage and exits"],
	resetSession: ["","--reset-session","On power outages, the session disk cache might corrupt. Use this to fix"]
}as const

import usage from "./flags/usage"
import help from "./flags/help"
const flags:Record<keyof typeof flagDefs,()=>Promise<void>>={
	config,
	version: async ()=>{
		console.log(pkgInfo.version)
	},
	help,
	usage,
	resetSession: async ()=>{
		fs.unlink(path.resolve(__dirname,"..","sessionStore"))
	}

}
export default flags
