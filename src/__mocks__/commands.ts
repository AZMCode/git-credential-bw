import {commandsI, loginDetails} from "../commands"
export default {
	get: ()=>({
		protocol:"https",
		host:"github.com",
		username:"mockUser",
		password:"mockPwd"
	})
} as commandsI
