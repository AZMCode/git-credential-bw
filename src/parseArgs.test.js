jest.spyOn(process,'exit').mockImplementation(()=>{()=>{}});
jest.spyOn(process.stdout,'write').mockImplementation(()=>{()=>{}});
global.console = {
		log: jest.fn(()=>{}),
		error: jest.fn(()=>{})
	}
const parseArgs = jest.requireActual("./parseArgs");
const inputResults = [
	[
		// Name for the test
		"Short flag",
		// Argv value for parseArgs to process
		["mockNode", "mockName","-c"],
		// Expected parsed config
		{command: undefined, flags: {
			...parseArgs.flagBools,
			config: true
		}},
	],
	[
		"Long flag and command",
		["mockNode", "mockName","--help","mock"],
		{command: "mock", flags: {
			...parseArgs.flagBools,
			help: true
		}},
	],
	[
		"Short flag and multiple commands",
		["mockNode", "mockName","-h","mock1","got","git"],
		{command: "mock1", flags: {
			...parseArgs.flagBools,
			help: true
		}},
	],
	[
		"Multiple commands",
		["mockNode", "mockName","get","got","git"],
		{command: "get", flags: {
			...parseArgs.flagBools
		}},
	],
	[
		"Multiple commands with short flag in between",
		["mockNode", "mockName","get","got","-v","git"],
		{command: "get", flags: {
			...parseArgs.flagBools,
			version: true
		}},
	]
]
test.each(inputResults)("Argv parse test #%#: %p",(name,input,output)=>{
	const parsedArgs = jest.requireActual("./parseArgs").default(input)
	expect({...parsedArgs}).toEqual(output);
});
