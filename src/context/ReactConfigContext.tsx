import { createContext } from "react";
import { RouterActions } from "../reducers/RouterConfigReducer";
import { Router, RouterInterface } from "../types/redes-types";
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

export const RouterConfigContext = createContext<{
	routerConfig: Router;
	dispatch: (action: RouterActions) => void;
}>({
	routerConfig: emptyRouterConfiguration,
	dispatch: (action: RouterActions) => {},
});
