const { deepStrictEqual } = jest.requireActual("assert");
const gitIO = jest.requireActual("./gitIO");
test("stringToMap",()=>{
	const returnVal = [...gitIO.stringToMap("prop1=val1\nprop2=val2\n")];
	const expectedReturn = [["prop1","val1"],["prop2","val2"]]
	expect(returnVal).toEqual(expectedReturn);
});
test("mapToString",()=>{
	const returnVal = gitIO.mapToString(new Map([["prop1","val1"],["prop2","val2"]]));
	const expectedReturn = "prop1=val1\nprop2=val2\n"
	expect(returnVal).toEqual(expectedReturn);
});
test("lgDetsToMap",()=>{
	const returnVal = gitIO.lgDetsToMap({
		protocol:"mockProt",
		host:"mock.site",
		username:"mockUser",
		password:"mockPwd"
	});
	expect(returnVal.get("protocol")).toEqual("mockProt");
	expect(returnVal.get("host")).toEqual("mock.site");
	expect(returnVal.get("username")).toEqual("mockUser");
	expect(returnVal.get("password")).toEqual("mockPwd");
});
