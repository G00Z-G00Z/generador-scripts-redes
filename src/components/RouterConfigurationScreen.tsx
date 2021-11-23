import React from "react";
import { GenratedScript } from "./GenratedScript";
import { RouterConfiguration } from "./RouterConfiguration";
import {
	RouterConfigContext,
	emptyRouterConfiguration,
} from "../context/ReactConfigContext";

export const RouterConfigurationScreen = () => {
	return (
		<RouterConfigContext.Provider value={emptyRouterConfiguration}>
			<RouterConfiguration />
			<GenratedScript />
		</RouterConfigContext.Provider>
	);
};
