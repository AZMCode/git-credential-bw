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
		["mockName","-c"],
		// Expected parsed config
		{command: undefined, flags: {
			...parseArgs.flagBools,
			config: true
		}},
	],
	[
		"Long flag and command",
		["mockName","--config","mock"],
		{command: "mock", flags: {
			...parseArgs.flagBools,
			config: true
		}},
	],
	[
		"Short flag and multiple commands",
		["mockName","-c","mock1","got","git"],
		{command: "mock1", flags: {
			...parseArgs.flagBools,
			config: true
		}},
	],
	[
		"Multiple commands",
		["mockName","get","got","git"],
		{command: "get", flags: {
			...parseArgs.flagBools
		}},
	],
	[
		"Multiple commands with short flag in between",
		["mockName","get","got","-c","git"],
		{command: "get", flags: {
			...parseArgs.flagBools,
			config: true
		}},
	]
]
test.each(inputResults)("Argv parse test #%#: %p",(name,input,output)=>{
	process.argv = input;
	const parsedArgs = jest.requireActual("./parseArgs").default()
	expect({...parsedArgs}).toEqual(output);
});
