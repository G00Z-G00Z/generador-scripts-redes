export const number2subtnetMask = (bitCount: number) => {
	const mask = [];
	for (let i = 0; i < 4; i++) {
		const n = Math.min(bitCount, 8);
		mask.push(256 - Math.pow(2, 8 - n));
		bitCount -= n;
	}
	return mask.join(".");
};
