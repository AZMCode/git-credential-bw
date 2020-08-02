export function isProp(obj:object,prop:string|number|symbol):prop is keyof( typeof obj){ //eslint-disable-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	return obj.hasOwnProperty(prop); //eslint-disable-line no-prototype-builtins
}
