const {isProp, hasAllProps} = jest.requireActual("./utils");
describe("isProp to work correctly",()=>{
	const testCases = [
		[
			"mock2",
			{mock1: null, mock2: undefined, mock3: null},
			true
		],
		[
			"mock2",
			{mock1: null, mock3: null},
			false
		],
		[
			"mock2",
			{mock1: null, mock2: "", mock3: null},
			true
		]
	]
	test.each(testCases)("Non-throw test #%#",(prop,obj,val)=>{
		expect(()=>(isProp(obj,prop))).not.toThrow();
	})
	test.each(testCases)("Correct value test #%#",(prop,obj,val)=>{
		expect(isProp(obj,prop)).toEqual(val);
	})
});
describe("hasAllProps to work correctly",()=>{
	const testCases = [
		[
			{mock1:true, mock2:false, mock3: true},
			{mock1: null, mock2: undefined, mock3: null},
			true
		],
		[
			{mock1:true, mock2:false, mock3: true},
			{mock1: null, mock3: null},
			false
		],
		[
			{mock1:true, mock2:false, mock3: true},
			{mock1: null, mock2: "", mock3: null, mock4:"hello"},
			true
		]
	]
	test.each(testCases)("Non-throw test #%#",(obj1,obj2,val)=>{
		expect(()=>(hasAllProps(obj1,obj2))).not.toThrow();
	})
	test.each(testCases)("Correct value test #%#",(obj1,obj2,val)=>{
		expect(hasAllProps(obj1,obj2)).toEqual(val);
	})
})
