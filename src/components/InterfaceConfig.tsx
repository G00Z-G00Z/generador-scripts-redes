import React, { useRef, FC } from "react";
import { Interface } from "./Interface";
import { useState, useContext } from "react";
import { RouterConfigContext } from "../context/ReactConfigContext";
import { useEffect } from "react";
import { RouterInterface } from "../types/redes-types";
import { RouterItemConfigurable } from "../reducers/RouterConfigReducer";
import { RouterConfigurationScreen } from "./RouterConfigurationScreen";

function* keyGeneratorFunc() {
	for (let i = 0; ; i++) yield i.toString();
}

const keyGenerator = keyGeneratorFunc();

export const InterfaceConfig = () => {
	const { routerConfig, dispatch } = useContext(RouterConfigContext);

	const divRef = useRef<null | HTMLDivElement>(null);

	const handleAdding = () => {
		console.log("Estoy añadiendo el mapa");
		const key = keyGenerator?.next()?.value ?? "1";
		dispatch({
			type: RouterItemConfigurable.createNewInterface,
			payload: {
				key,
			},
		});
	};

	useEffect(() => {
		console.log("Cambio el mapa!!");
	}, [routerConfig.interfaces]);

	return (
		<>
			<h2>Configuración de las interfaces</h2>
			<div className="interfaces container" ref={divRef}>
				{Array.from(routerConfig.interfaces, (pair) => {
					const [key, inter] = pair;

					return (
						<div key={key} className="interface">
							<Interface id={key} routerInter={inter} />
							<button
								className="btn btn-danger"
								onClick={() => {
									dispatch({
										type: RouterItemConfigurable.eraseInterface,
										payload: {
											key,
										},
									});
								}}
							>
								Eliminar Interface
							</button>
						</div>
					);
				})}
			</div>
			<button className="btn btn-success" onClick={handleAdding}>
				Add interface
			</button>
		</>
	);
};
