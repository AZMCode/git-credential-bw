beforeEach(()=>{
jest
.mock('./commands')
.mock('./config')
.mock('./gitIO')
.mock('get-stdin')
.spyOn(global.console,"log").mockImplementation(()=>{()=>{}})
});

describe("Calls the correct external functions with the correct arguments",()=>{
	// Set of different parsed CLI args passed to main.ts
	const testCases =[
		[
			//Name for the set of parsed CLI args passed to main.ts
			"Get only",
			//Object passed to main.ts
			{config: false, command: ["get"]},
			//Amount of calls to [parseArgs, commands.commands.get, config] respectively
			[1,1,0]
		],
		[
			"Config only",
			{config: true, command: []},
			[1,0,1]
		],
		[
			"Get and Config",
			{config: true, command: ["get"]},
			[1,0,1]
		]
	];
	test.each(testCases)("'%p' CLI arguments",async (name,mock_parsed,callNums)=>{
		jest.mock("./parseArgs",()=>(
			jest.fn(()=>(mock_parsed))
		));
		await jest.requireActual("./main");
		const parseArgsMock = jest.requireMock("./parseArgs");
		const commandsMock = jest.requireMock("./commands");
		const configMock = jest.requireMock("./config");

		expect(parseArgsMock).toHaveBeenCalledTimes(callNums[0]);
		expect(commandsMock.commands.get).toHaveBeenCalledTimes(callNums[1]);
		expect(configMock.default).toHaveBeenCalledTimes(callNums[2]);
	});





});
describe("Stdio used correctly",()=>{
	beforeEach(()=>{
		jest.mock("./parseArgs",()=>(
			jest.fn(()=>({config: false, command: ["get"]}))
		));
	});
	test("get-stdin called on run",async ()=>{
		await jest.requireActual("./main");
		const getStdinMockLib = jest.requireMock("get-stdin");
		expect(getStdinMockLib).toHaveBeenCalledTimes(1);;
	});
	test("console.log called on run",async ()=>{
		await jest.requireActual("./main");
		expect(global.console.log).toHaveBeenCalledTimes(1);
		expect(global.console.log).toHaveBeenCalledWith("prop1=val1\nprop2=val2\n");
	});
});
