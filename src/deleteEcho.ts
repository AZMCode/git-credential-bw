import stream from "stream"
import assert from "assert"
export default class DeleteEcho extends stream.Transform{
    _internalBuffer = Buffer.from("");
    _internalCounter = 0
    _readByte():number | null{
        if(this._internalBuffer.length > 0){
            const out = (this._internalCounter % 2 === 0)?0x8:0x20
            this._internalCounter++
            if(this._internalCounter === 3){
                this._internalCounter = 0;
                this._internalBuffer = this._internalBuffer.slice(1)
            }
            return out;
        } else {
            return null
        }
    }
    constructor(){
        super({
            write:(inBuf)=>{
                assert(inBuf instanceof Buffer);
                this._internalBuffer = Buffer.from([...this._internalBuffer,...inBuf])
            },
            read:()=>{
                while(this._internalBuffer.length > 0){
                    this.push(Buffer.from([this._readByte()]))
                }
            },
            allowHalfOpen: false,
            writableHighWaterMark: 5461
        })
    }
}
