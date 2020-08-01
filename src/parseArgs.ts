import { ArgumentParser } from "argparse"
import * as pkgInfo from "./pkgInfo.json"
interface args{
	config: boolean,
	command: string[]
}
export default function parseArgs():args{
	const parser = new ArgumentParser({
		version: pkgInfo.version,
		addHelp: true,
		description: `Git Credential Helper for Bitwarden CLI`
	});
	parser.addArgument(["-c","--config"],{
		action:"storeTrue",
		nargs: 1,
		help: "Configures Git to use the helper in the current repository, otherwise globally"
	});
	parser.addArgument("command",{
		action:"store",
		nargs: 1
	});
	return parser.parseArgs();
}
