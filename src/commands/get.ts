export interface loginDetails{
	protocol: string,
	host: string,
	username: string,
	password: string,
	[key: string]: string
}
export default async (input: string):Promise<loginDetails>=>{
	return {
		protocol:"https",
		host:"github.com",
		username:"mockUser",
		password:"mockPwd"
	};
}
