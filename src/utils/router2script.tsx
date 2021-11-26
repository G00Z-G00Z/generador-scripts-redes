import { Router } from "../types/redes-types";
import { ipAddress2network } from "./ipAddress2network";
import { number2subtnetMask } from "./numberToSubnetMask";

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

	const ipAddressForRip: string[] = [];

	// Interfaces
	for (const key in router.interfaces) {
		const inter = router.interfaces[key];

		const { description, ipAddress, ipMask, interfaceCableType } = inter;

		hasRip && ipAddressForRip.push(ipAddress);

		let bitcount: number = 10;

		try {
			bitcount = Number(ipMask);
		} catch (error) {}

		const { port, type } = interfaceCableType;

		let isFemale =
			inter.interfaceCableType.type === "serial"
				? inter.interfaceCableType.isFemale
				: false;

		const textoInterface = `interface ${type} ${port}
${isFemale ? "clock rate 64000" : ""}
description ${description}
ip address ${ipAddress} ${number2subtnetMask(bitcount)}
no shutdown
exit
`;

		script += textoInterface;
	}

	// DHCP
	// 	for (const key in router.dhcp) {
	// 		const dhcpInter = router.dhcp[key];

	// 		let texto = `ip dhcp pool ${dhcpInter.poolName}
	// default-router ${dhcpInter.defaultRouter}
	// network ${dhcpInter.network}
	// ${dhcpInter.dnsServer ? `dns-server ${dhcpInter.dnsServer}` : ""}`;

	// 		dhcpInter.excluded.forEach((ex) => {
	// 			texto += `
	// ip dhcp excluded-address ${ex}`;
	// 		});

	// 		texto += "\nexit\n";

	// 		script += texto;
	// 	}

	// Rip

	if (hasRip) {
		script += "router rip\nversion 2\n";

		ipAddressForRip.forEach((ip) => {
			const network = ipAddress2network(ip);
			script += `network ${network}\n`;
		});
	}

	script += "exit\n";
	return script;
};
