export function isProp<T>(obj:T,prop:string|number|symbol):prop is keyof( typeof obj){ //eslint-disable-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	return Object.keys(obj).includes(String(prop)); //eslint-disable-line no-prototype-builtins
}
export function hasAllProps<T>(obj:T,obj2:Partial<T>):obj2 is T{
	let output = true;
	for(const key of Object.keys(obj)){
		if(!isProp(obj2,key)){
			output = false;
			break;
		}
	}
	return output;
}
