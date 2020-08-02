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
		"Short flag"
		// Argv value for parseArgs to process
		["mockName","-c"],
		// Expected parsed config
		{config: 1, command: null},
		// Number of calls to expect of process.exit
		0,
		// Regex to match to stdout. Null if none
		null
	],
	[
		"Long flag and command",
		["mockName","--config","mock"],
		{config: 1, command: ["mock"]},
		0,
		null
	],
	[
		"Short flag and multiple commands",
		["mockName","-c","mock1","got","git"],
		{config: 1, command: ["mock1"]},
		0,
		null
	],
	[
		"Multiple commands",
		["mockName","get","got","git"],
		{config: null, command: ["get","got","git"]},
		0,
		null
	],
	[
		"Multiple commands with short flag in between",
		["mockName","get","got","-c","git"],
		{config: 1, command: ["get","got","git"]},
		0,
		null
	]
]
test.each(inputResults)("Argv parse test #%#: %p",(name,input,output,exitCalls,stdoutMatch)=>{
	process.argv = input;
	const parsedArgs = jest.requireActual("./parseArgs").default()
	expect({...parsedArgs}).toEqual(output);
	expect(process.exit).toHaveBeenCalled(exitCalls);
	if(stdoutMatch === null){
		expect(process.stdout.write).not.toHaveBeenCalled()
	} else {
		expect(process.stdout.write.mock.calls
			.map((a)=>(a[0]))
			.join("")
			.match(stdoutMatch)
		);
	}
});
