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
