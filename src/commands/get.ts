import { gitArgs } from "../gitIO"
import { isProp } from "../utils"
import assert from "assert"
export interface loginDetails{
	protocol: string,
	host: string,
	username: string,
	password: string
}
const lgDetsToMap = (input:loginDetails):gitArgs=>{
	const out = new Map<string,string>();
	for(const key of Object.keys(input)){
		assert(isProp(input,key))
		const val = input[key];
		out.set(key,val);
	}
	return out;
}
export default async (input: string):Promise<gitArgs>=>{
	const out:loginDetails = {
		protocol:"https",
		host:"github.com",
		username:"mockUser",
		password:"mockPwd"
	}
	return lgDetsToMap(out)
}
