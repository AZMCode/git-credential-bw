const stream = jest.requireActual("stream");
const out = {spawn: jest.fn((args)=>(
	{
		stdout: new stream.Readable({}),
		stderr: new stream.Readable({read:()=>{}}),
		stdin: new stream.Writable({write:()=>{}})
	}
))}
out.status = status
module.exports = out
