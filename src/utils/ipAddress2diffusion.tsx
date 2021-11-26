const regex = /(\d+\.\d+\.\d+)\.\d+/gm;
const subst = `$1.255`;

export const ipAddress2diffusion = (ipAddress: string): string => {
	return ipAddress.replace(regex, subst);
};
