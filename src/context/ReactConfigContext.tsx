import { createContext } from "react";
import { RouterActions } from "../reducers/RouterConfigReducer";
import { Router } from "../types/redes-types";
import { emptyRouterConfiguration } from "../utils/emptyInterfaces";

export const RouterConfigContext = createContext<{
	routerConfig: Router;
	dispatch: (action: RouterActions) => void;
}>({
	routerConfig: emptyRouterConfiguration,
	dispatch: (action: RouterActions) => {},
});
