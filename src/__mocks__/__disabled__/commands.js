import {commandsI, loginDetails} from "../commands"
const commandsLib = jest.requireActual("../commands")
commandsLib.commands.get =jest.fn(()=>({
	protocol:"https",
	host:"github.com",
	username:"mockUser",
	password:"mockPwd"
}));
module.exports = commandsLib
