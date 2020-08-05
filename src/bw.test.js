beforeEach(()=>{
	jest
	.mock("cross-spawn")
	.mock("node-localstorage")
	.mock("./timeout")
	.mock("./config")
	.mock("assert")
	.mock("stream-to-string",()=>(
		(args)=>("{}")
	))
	.mock("path")
	.mock("util")
	.mock("fs")
	.mock("tty")
	.spyOn(global.console,"error")
		.mockImplementation(()=>(
			jest.fn(()=>{})
		));
	const status = {
		callStatus: 0
	}
	jest
	.spyOn(JSON,"parse").mockImplementation(()=>{
		switch(status.callStatus){
			case 0:
				status.callStatus++
				return {"status":"unauthenticated"}
			case 1:
				status.callStatus++
				return {"status":"locked"}
			case 2:
				status.callStatus++
				return {"status":"unlocked"}
			default:
				return {"login":{"username": "mockUser","password":"mockPwd"}}
		}
	});
})
describe("getCredentials function",()=>{
	test("LocalStorage gets called",async ()=>{
		await (require("./bw").default)()
		expect(require("node-localstorage").LocalStorage).toBeCalledTimes(1);
	});
	test("cross-spawn gets called six times",async ()=>{
		await (require("./bw").default)()
		expect(require("cross-spawn").spawn).toBeCalledTimes(6)
	});
	test("We get credentials on call",async ()=>{
		expect(await (require("./bw").default)()).toEqual(new Map([["username","mockUser"],["password","mockPwd"]]));
	});
	test("./timeout gets called",async ()=>{
		await (require("./bw").default)()
		expect(require("./timeout").default).toBeCalledTimes(1)
	});
	test("console.error called 2 times",async ()=>{
		await (require("./bw").default)()
		expect(global.console.error).toBeCalledTimes(2)
	});
	test("Undefined result on failure to unlock",async ()=>{
		JSON.parse.mockReset()
		jest.spyOn(JSON,"parse").mockImplementation((args)=>(
			{"status":"locked"}
		));
		expect(await (require("./bw").default)()).toEqual(undefined);
		expect(global.console.error).toBeCalledTimes(4);
	});
})
