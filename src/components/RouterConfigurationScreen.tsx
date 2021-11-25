import React, { useReducer } from "react";
import { GenratedScript } from "./GenratedScript";
import { RouterConfiguration } from "./RouterConfiguration";

import { RouterConfigContext } from "../context/ReactConfigContext";
import { RouterReducer } from "../reducers/RouterConfigReducer";
import { useEffect } from "react";
import { emptyRouterConfiguration } from "../utils/emptyInterfaces";

export const RouterConfigurationScreen = () => {
	const [routerConfig, dispatch] = useReducer(
		RouterReducer,
		emptyRouterConfiguration
	);

	useEffect(() => {
		console.log("Se ha cambiado este pedo");
	}, [routerConfig]);

	return (
		<RouterConfigContext.Provider
			value={{
				routerConfig,
				dispatch,
			}}
		>
			<div className="container mb-5">
				<p>
					<b>¿Como usarlo?</b> <br /> Puedes usar la configuracion llenando la
					informacion necesaria en las siguientes partes
				</p>
				<h2>Configuracion de {routerConfig.hostname || "router"}</h2>
				<RouterConfiguration />
				<GenratedScript />
			</div>
		</RouterConfigContext.Provider>
	);
};
