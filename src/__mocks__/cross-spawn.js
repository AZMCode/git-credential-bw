const stream = jest.requireActual("stream");
const out = {spawn: jest.fn((args)=>(
	{
		stdout: new stream.Readable({}),
		stderr: new stream.Readable({read:()=>{}}),
		stdin: new stream.Writable({write:()=>{}}),
		kill: ()=>{}
	}
))}
out.status = status
module.exports = out
