/* istanbul ignore file */
import usage from "./usage"
import * as pkgInfo from "../pkgInfo.json"
import { flagDefs } from "../flags"
export default async():Promise<void>=>{
	usage();
	console.log(pkgInfo.description);
	console.log("");
	for(const [short,long,desc] of Object.values(flagDefs)){
		if(short || long){
			let outLine = "  "
			if(short && long){
				outLine += short + ", " + long
			} else if(short && !long){
				outLine += short
			} else {
				outLine += "    " + long
			}
			outLine += " ".repeat(27 - outLine.length)
			outLine += desc
			console.log(outLine);
		}
	}
	console.log("")
	console.log(`Examples:`)
	console.log(`  ${pkgInfo.name} get    Reads stdin for search params and outputs a user and password.`)
	console.log(`  ${pkgInfo.name} -c     Configures Git so this helper is used globally`)
}
