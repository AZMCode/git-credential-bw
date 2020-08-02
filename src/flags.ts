import * as pkgInfo from "./pkgInfo.json"
import config from "./flags/config"

export const flagDefs = {
	config: ["-c","--config"],
	version: ["-v","--version"],
	help: ["-h,--help"],
	usage: ["","--usage"]
}as const


export const flags:Record<keyof typeof flagDefs,()=>Promise<void>>={
	config,
	version: async ()=>{
		console.log(pkgInfo.version)
	},
	help: async ()=>{
		console.log(`Help is still a WIP`);
	},
	usage: async ()=>{
		console.log(`Usage is still also a WIP`)
	}

}
