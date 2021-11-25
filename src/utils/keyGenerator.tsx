export function* keyGeneratorFunc() {
	for (let i = 0; ; i++) yield i.toString();
}
