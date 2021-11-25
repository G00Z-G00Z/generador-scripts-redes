import React, { useReducer } from "react";
import { GenratedScript } from "./GenratedScript";
import { RouterConfiguration } from "./RouterConfiguration";

import { RouterConfigContext } from "../context/ReactConfigContext";
import { RouterReducer } from "../reducers/RouterConfigReducer";
import { useEffect } from "react";
import { emptyRouterConfiguration } from "../utils/emptyInterfaces";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const RouterConfigurationScreen = () => {
	const { setValue, value } = useLocalStorage(
		"routerConfig",
		emptyRouterConfiguration
	);

	const [routerConfig, dispatch] = useReducer(
		RouterReducer,
		value ?? emptyRouterConfiguration
	);

	useEffect(() => {
		setValue(routerConfig);
	}, [routerConfig, setValue]);

	return (
		<RouterConfigContext.Provider
			value={{
				routerConfig,
				dispatch,
			}}
		>
			<div className="container mb-5 px-5">
				<p>
					<b>¿Como usarlo?</b> <br /> Puedes usar la configuracion llenando la
					informacion necesaria en las siguientes partes
				</p>
				<h2 className="text-center">
					Configuracion de {routerConfig.hostname || "router"}
				</h2>
				<RouterConfiguration />
				<GenratedScript />
			</div>
		</RouterConfigContext.Provider>
	);
};
