import { gitArgs, stringToMap } from "../gitIO"
import getLgDets from "../bw"
export default async (input: string):Promise<gitArgs|undefined>=>{
	const lgDets = stringToMap(input);
	return getLgDets(lgDets.get("host"))
}
