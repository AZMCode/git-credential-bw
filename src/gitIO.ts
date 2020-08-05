export type gitArgs = Map<string,string>
export const stringToMap = (input: string):gitArgs=>{
	const out = new Map<string,string>();
	input = input.trim();
	input.split("\n").map((str)=>{
		const firstEqIndex = str.indexOf('=');
		const firstPart = str.substring(0,firstEqIndex);
		const secondPart = str.substring(firstEqIndex+1);
		return [firstPart, secondPart] as const;
	}).forEach((e)=>{out.set(...e)})
	return out;
}
export const mapToString = (input:gitArgs):string=>{
	let out = "";
	for(const pair of input){
		out += `${pair[0]}=${pair[1]}\n`
	}
	return out;
}
