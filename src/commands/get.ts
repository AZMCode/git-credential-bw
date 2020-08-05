import { gitArgs, stringToMap } from "../gitIO"
import getCredentialsBw from "../bw"
export default async (input: string):Promise<gitArgs|undefined>=>{
	const lgDets = stringToMap(input);
	return getCredentialsBw(lgDets.get("host"))
}
