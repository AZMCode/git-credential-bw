import { spawn } from "cross-spawn"
export default async ():Promise<void>=>{
	spawn("git",["config", "--global", "--add", "credential.helper", "bw"],{detached: true});
}
