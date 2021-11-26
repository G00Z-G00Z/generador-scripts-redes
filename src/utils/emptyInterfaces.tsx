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
	dhcp: {},
	hasRip: false,
};

export const emptyRouterInterface: RouterInterface = {
	description: "",
	interfaceCableType: {
		type: "fastethernet",
		port: "",
	},
	ipAddress: "",
	ipMask: "",
};

export const emptyDhcpConfiguration: DHCPConfiguration = {
	defaultRouter: "",
	dnsServer: "",
	excluded: [],
	network: "",
	poolName: "",
};
