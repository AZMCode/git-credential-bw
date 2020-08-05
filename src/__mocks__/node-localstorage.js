module.exports = {LocalStorage: jest.fn().mockImplementation(
	()=>(
		{
			getItem: (item)=>{
				switch(item){
					case "sessionKey":{return "mockKey"}
					case "timeoutIsActive":{return ""}
					default:{return undefined}
				}
			},
			setItem:()=>{}
		}
	)
)
}
