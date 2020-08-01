export interface commandsI{
	[key: string]: ()=>loginDetails
}
export interface loginDetails{
	protocol: string,
	host: string,
	username: string,
	password: string
}

const commands:commandsI = {
	/*get: ()=>:loginDetails{

	}*/
}
export default commands
