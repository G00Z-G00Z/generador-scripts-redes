import React, { useReducer, FC, useEffect } from "react";
import { GenratedScript } from "./GenratedScript";
import { RouterConfiguration } from "./RouterConfiguration";

import { RouterConfigContext } from "../context/ReactConfigContext";
import { RouterReducer } from "../reducers/RouterConfigReducer";

import { Router } from "../types/redes-types";
import { useSessionStorage } from "../hooks/useLocalStorage";
import { emptyRouterConfiguration } from "../utils/emptyInterfaces";

interface Props {
	routerConfigParameters: Router;
	updateRouter: (key: string, r: Router) => void;
	id: string;
}
// Missing clean up

export const RouterConfigurationScreen: FC<Props> = ({
	routerConfigParameters,
	id,
}) => {
	const [value, setValue, removeValue] = useSessionStorage(
		`router_${id}`,
		routerConfigParameters
	);

	const [routerConfig, dispatch] = useReducer(
		RouterReducer,
		value || emptyRouterConfiguration
	);

	useEffect(() => {
		setValue(routerConfig);
	}, [routerConfig, setValue]);

	useEffect(() => {
		return () => {
			removeValue();
		};
	}, []);

	return (
		<RouterConfigContext.Provider
			value={{
				routerConfig,
				dispatch,
			}}
		>
			<div className="container mb-3 border shadow-sm">
				<h2 className="text-center">
					Configuracion de{" "}
					{`${
						routerConfig.hostname ? `router:${routerConfig.hostname}` : "router"
					}`}
				</h2>
				<RouterConfiguration />
				<GenratedScript />
			</div>
		</RouterConfigContext.Provider>
	);
};
