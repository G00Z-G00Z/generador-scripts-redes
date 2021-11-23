import { createContext } from "react";
import { Router } from "../types/redes-types";

export const emptyRouterConfiguration = {
	hostname: "",
	interfaces: [],
	security: {
		bannerMord: "",
		encription: false,
		lineConsole: false,
		vty: false,
	},
};

export const RouterConfigContext = createContext<Router>(
	emptyRouterConfiguration
);
