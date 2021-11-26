const regex = /(\d+\.\d+\.\d+)\.\d+/gm;
const subst = `$1.0`;

export const ipAddress2network = (ipAddress: string): string => {
	return ipAddress.replace(regex, subst);
};
