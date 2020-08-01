interface args{
	config: boolean,
	command: string[]
}
export default function():args{
	return {
		config: false,
		command: ["get"]
	}
}
