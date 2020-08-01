export interface commandsI{
	[key: string]: ()=>loginDetails
}
export interface loginDetails{
	protocol: string,
	host: string,
	username: string,
	password: string,
	[key: string]: string
}
const commands:commandsI = {
	/*get: ()=>:loginDetails{

	}*/
}
export default commands
