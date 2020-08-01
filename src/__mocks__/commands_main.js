import {commandsI, loginDetails} from "../commands"
export default {
	get: ():loginDetails=>({
		protocol:"https",
		host:"github.com",
		username:"mockUser",
		password:"mockPwd"
	})
}
