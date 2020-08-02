export const stringToMap = jest.fn(()=>(new Map([["prop1","val1"],["prop2","val2"]])));
export const mapToString = jest.fn(()=>("prop1=val1\nprop2=val2\n"));
export const lgDetsToMap = jest.fn(()=>(new Map([["protocol","mockProt"],["host","mockSite.com"],["username","mockUser"],["password","mockPassword"]])));
