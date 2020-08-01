export function isProp(obj:any,prop:string|number|symbol):prop is keyof( typeof obj){
	return obj.hasOwnProperty(prop)
}
