import { Router } from "../types/redes-types";
import { ipAddress2network } from "./ipAddress2network";
import { number2subtnetMask } from "./numberToSubnetMask";
import { ipAddress2diffusion } from "./ipAddress2diffusion";

const lineConsole = `enable secret cisco
line console 0
password cisco
login
exit`;

const lineVty = `line vty 0 4
password cisco
login
exit`;

const encription = "service password-encryption";

// ! hacer que tenga mascara el dhcp network
export const router2script = (router: Router): string => {
	const { hostname, security, hasRip } = router;

	let script = `
enable
configure terminal 
hostname ${hostname}
${security.lineConsole ? lineConsole : ""}
${security.vty ? lineVty : ""}
banner motd #${security.bannerMord}#
${security.encription ? encription : ""}
`;

	const ipNetworks: string[] = [];

	// Interfaces
	for (const key in router.interfaces) {
		const inter = router.interfaces[key];

		const { description, ipAddress, ipMask, interfaceCableType, dhcp } = inter;

		const { dnsServer, excluded, poolName } = dhcp;

		const { port, type } = interfaceCableType;
		const network = ipAddress2network(ipAddress),
			diffussion = ipAddress2diffusion(ipAddress),
			mascaraReal = number2subtnetMask(Number(ipMask));

		hasRip && ipNetworks.push(network);

		let isFemale =
			inter.interfaceCableType.type === "serial"
				? inter.interfaceCableType.isFemale
				: false;

		const textoInterface = `interface ${type} ${port}
${isFemale ? "clock rate 64000" : ""}
description ${description}
ip address ${ipAddress} ${mascaraReal}
no shutdown
exit
`;

		script += textoInterface;

		if (interfaceCableType.type === "serial") continue;
		script += `ip dhcp pool ${poolName}
default-router ${ipAddress}
network ${network} ${mascaraReal}
${dnsServer !== "" ? `dns-server ${dnsServer}` : ""}
ip dhcp excluded-address ${ipAddress}
ip dhcp excluded-address ${diffussion}
${
	diffussion === dnsServer || dnsServer === ""
		? ""
		: `ip dhcp excluded-address ${dnsServer}`
}
`;

		for (const ip of excluded) {
			if (ip === "") continue;
			script += `ip dhcp excluded-address ${ip}\n`;
		}
	}

	// Rip

	if (hasRip) {
		script += "router rip\nversion 2\n";

		ipNetworks.forEach((network) => {
			script += `network ${network}\n`;
		});
	}

	script += "exit\n";
	return script;
};
