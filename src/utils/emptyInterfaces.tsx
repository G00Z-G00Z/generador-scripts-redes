import {
	RouterInterface,
	DHCPConfiguration,
	Router,
} from "../types/redes-types";

export const emptyRouterConfiguration: Router = {
	hostname: "",
	interfaces: {},
	security: {
		bannerMord: "",
		encription: false,
		lineConsole: false,
		vty: false,
	},
	hasRip: false,
};
export const emptyDhcpConfiguration: DHCPConfiguration = {
	dnsServer: "",
	excluded: [],
	poolName: "",
};

export const emptyRouterInterface: RouterInterface = {
	description: "",
	interfaceCableType: {
		type: "fastethernet",
		port: "",
	},
	ipAddress: "",
	ipMask: "",
	dhcp: { ...emptyDhcpConfiguration },
};
