jest
.mock('./commands')
.mock('./config')
.mock('./gitIO')
.mock('get-stdin')
.mock('process',
	()=>({
		stdout: {
			write: jest.fn(()=>{})
		}
	})
);


describe("Calls the correct external functions with the correct arguments",()=>{
	// Set of different parsed CLI args passed to main.ts
	const inOuts = new Set([
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
	]);
	for(const mock_inOut of inOuts){
		test(`"${mock_inOut[0]}" CLI arguments`,async ()=>{
			jest.mock("./parseArgs",()=>(
				jest.fn(()=>(mock_inOut[1]))
			));
			await require("./main");
			const parseArgsMock = jest.requireMock("./parseArgs");
			const commandsMock = jest.requireMock("./commands");
			const configMock = jest.requireMock("./config");

			expect(()=>{parseArgsMock.mock.calls.length === mock_inOut[2][0]});
			expect(()=>{commandsMock.commands.get.mock.calls.length === mock_inOut[2][1]});
			expect(()=>{configMock.default.mock.calls.length === mock_inOut[2][1]});
		});
	}




});
describe("Stdio used correctly",()=>{
	jest.mock("./parseArgs",()=>(
		jest.fn(()=>({config: false, command: ["get"]}))
	));



	test("get-stdin called on run",async ()=>{
		await require("./main");

		const getStdinMockLib = jest.requireMock("get-stdin");
		expect(getStdinMockLib.mock.calls.length === 1);
	});
	test("Right output written to stdout",async ()=>{
		await require("./main");

		const processMockLib = jest.requireMock("process");
		expect(processMockLib.stdout.write.mock.calls.length === 1);
		expect(()=>{processMockLib.stdout.write.mock.calls[0].length}).not.toThrow();
		expect(processMockLib.stdout.write.mock.calls[0].length === 1);
		expect(()=>{processMockLib.stdout.write.mock.calls[0][0]}).not.toThrow();
		expect(processMockLib.stdout.write.mock.calls[0][0] === "prop1=val1\nprop2=val2\n");
	});
});
