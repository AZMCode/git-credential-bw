export interface commandsI{
	[key: string]: (input:string)=>loginDetails
}
export interface loginDetails{
	protocol: string,
	host: string,
	username: string,
	password: string,
	[key: string]: string
}
export const commands:commandsI = {
	get: (input: string):loginDetails=>{
		return {
			protocol:"https",
			host:"github.com",
			username:"mockUser",
			password:"mockPwd"
		};
	}
}
