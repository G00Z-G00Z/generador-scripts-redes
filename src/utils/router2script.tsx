import { Router } from "../types/redes-types";
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
	let script = `
enable
configure terminal 
hostname ${router.hostname}
${router.security.lineConsole ? lineConsole : ""}
${router.security.vty ? lineVty : ""}
banner motd #${router.security.bannerMord}#
${router.security.encription ? encription : ""}
`;

	for (const key in router.interfaces) {
		const inter = router.interfaces[key];

		const { description, ipAddress, ipMask, interfaceCableType } = inter;

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

	for (const key in router.dhcp) {
		const dhcpInter = router.dhcp[key];

		let texto = `ip dhcp pool ${dhcpInter.poolName}
default-router ${dhcpInter.defaultRouter}
network ${dhcpInter.network}
${dhcpInter.dnsServer ? `dns-server ${dhcpInter.dnsServer}` : ""}`;

		dhcpInter.excluded.forEach((ex) => {
			texto += `
ip dhcp excluded-address ${ex}`;
		});

		texto += "\nexit\n";

		script += texto;
	}

	return script;
};
