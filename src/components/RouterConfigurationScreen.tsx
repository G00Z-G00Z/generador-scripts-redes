import React, { useReducer } from "react";
import { GenratedScript } from "./GenratedScript";
import { RouterConfiguration } from "./RouterConfiguration";

import {
	RouterConfigContext,
	emptyRouterConfiguration,
} from "../context/ReactConfigContext";
import { RouterReducer } from "../reducers/RouterConfigReducer";

export const RouterConfigurationScreen = () => {
	const [routerConfig, dispatch] = useReducer(
		RouterReducer,
		emptyRouterConfiguration
	);

	return (
		<RouterConfigContext.Provider
			value={{
				routerConfig,
				dispatch,
			}}
		>
			<div className="container">
				<h1>Configuracion del router</h1>
				<p>
					<b>¿Como usarlo?</b> <br /> Puedes usar la configuracion llenando la
					informacion necesaria en las siguientes partes
				</p>
				<RouterConfiguration />
				<GenratedScript />
			</div>
		</RouterConfigContext.Provider>
	);
};
