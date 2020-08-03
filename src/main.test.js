beforeEach(()=>{
	jest
	.mock('./commands')
	.mock('./flags')
	.mock('./gitIO')
	.mock('get-stdin')
	.spyOn(global.console,"log").mockImplementation(()=>{()=>{}})
});
const dotted = jest.requireActual("@marcopeg/dotted").default;
describe("Calls the correct external functions and logs the right things",()=>{
	// Set of different parsed CLI args passed to main.ts
	const testCases =[
		[
			// Name for the set of parsed CLI args passed to main.ts
			"Get only",
			// Object passed to main.ts
			{command: "get", flags:{
				config: false,
				version: false,
				help: false,
				usage: false,
			}},
			// Amount of calls to various mocks, and a description of the mocks
			[
				["commandsMock.default.get",  1, "commands.get" ],
				["flagsMock.default.config",  0, "flags.config" ],
				["flagsMock.default.version", 0, "flags.version"],
				["flagsMock.default.help",    0, "flags.help"   ],
				["flagsMock.default.usage",   0, "flags.usage"  ],
				["console.log",               1, "console.log"  ],
				["getStdinMockLib",           1, "get-stdin"    ],
				["parseArgsMock",             1, "parseArgs"    ]
			],
			// Regex to match the call to console.log, null otherwise,
			null

		],
		[
			"Config only",
			{command: undefined, flags:{
				config: true,
				version: false,
				help: false,
				usage: false,
			}},
			[
				["commandsMock.default.get",  0, "commands.get" ],
				["flagsMock.default.config",  1, "flags.config" ],
				["flagsMock.default.version", 0, "flags.version"],
				["flagsMock.default.help",    0, "flags.help"   ],
				["flagsMock.default.usage",   0, "flags.usage"  ],
				["console.log",               0, "console.log"  ],
				["getStdinMockLib",           0, "get-stdin"    ],
				["parseArgsMock",             1, "parseArgs"    ]
			],
			null
		],
		[
			"Get and Config",
			{command: "get", flags:{
				config: true,
				version: false,
				help: false,
				usage: false,
			}},
			[
				["commandsMock.default.get",  0, "commands.get" ],
				["flagsMock.default.config",  1, "flags.config" ],
				["flagsMock.default.version", 0, "flags.version"],
				["flagsMock.default.help",    0, "flags.help"   ],
				["flagsMock.default.usage",   0, "flags.usage"  ],
				["console.log",               0, "console.log"  ],
				["getStdinMockLib",           0, "get-stdin"    ],
				["parseArgsMock",             1, "parseArgs"    ]
			],
			null
		],
		[
			"Unknown Command",
			{command: "mockCommand", flags:{
				config: false,
				version: false,
				help: false,
				usage: false,
			}},
			[
				["commandsMock.default.get",  0, "commands.get" ],
				["flagsMock.default.config",  0, "flags.config" ],
				["flagsMock.default.version", 0, "flags.version"],
				["flagsMock.default.help",    0, "flags.help"   ],
				["flagsMock.default.usage",   0, "flags.usage"  ],
				["console.log",               0, "console.log"  ],
				["getStdinMockLib",           0, "get-stdin"    ],
				["parseArgsMock",             1, "parseArgs"    ]
			],
			null
		]
	];
	test.each(testCases)("%p CLI arguments",async (name,mock_parsed,callNums,logMatch)=>{
		jest.mock("./parseArgs",()=>(
			jest.fn(()=>(mock_parsed))
		));
		const mocks = {
			parseArgsMock   : jest.requireMock("./parseArgs"),
			commandsMock    : jest.requireMock("./commands"),
			flagsMock       : jest.requireMock("./flags"),
			getStdinMockLib : jest.requireMock("get-stdin"),
			console
		}
		await jest.requireActual("./main");

		for(const [mockPath, callNum, desc] of callNums){
			// I know... eval... it's the only way i know how to make it work.
			expect(dotted(mocks,mockPath),`Wrong number of calls to ${desc}`).toBeCalledTimes(callNum)
		}
		const consoleLogMatch = callNums.map((e)=>(e[0])).indexOf(global.console.log);
		if(consoleLogMatch > 0){
			if(callNums[consoleLogMatch] > 0){
				if(logMatch !== null){
					const loggedText = global.console.log.mock.calls.map((e)=>(e.join(" "))).join("\n");
					expect(loggedText).stringMatching(logMatch);
				}
			}
		}
	});
});
