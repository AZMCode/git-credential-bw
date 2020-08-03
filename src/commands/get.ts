import { gitArgs, stringToMap } from "../gitIO"
import { isProp } from "../utils"
import getLgDets from "../bw"
import assert from "assert"
export default async (input: string):Promise<gitArgs>=>{
	const lgDets = stringToMap(input);
	return getLgDets(lgDets.get("host"))
}
