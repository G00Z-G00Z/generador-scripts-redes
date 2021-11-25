import {
	RouterInterface,
	DHCPConfiguration,
	Router,
} from "../types/redes-types";

export const emptyRouterConfiguration: Router = {
	hostname: "",
	interfaces: new Map<string, RouterInterface>(),
	security: {
		bannerMord: "",
		encription: false,
		lineConsole: false,
		vty: false,
	},
};

export const emptyRouterInterface: RouterInterface = {
	description: "",
	interfaceCableType: {
		type: "fastethernet",
		port: "",
	},
	ipAddress: "",
	ipMask: "",
	dhcp: new Map<string, DHCPConfiguration>(),
};

export const emptyDhcpConfiguration: DHCPConfiguration = {
	defaultRouter: "",
	dnsServer: "",
	excluded: [],
	network: "",
	poolName: "",
};
