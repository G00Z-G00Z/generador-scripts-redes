import React, { useRef, FC } from "react";
import { Interface } from "./Interface";
import { useState, useContext } from "react";
import { RouterConfigContext } from "../context/ReactConfigContext";
import { useEffect } from "react";
import { RouterInterface } from "../types/redes-types";

function* keyGeneratorFunc() {
	for (let i = 0; ; i++) yield i.toString();
}

const keyGenerator = keyGeneratorFunc();

export const InterfaceConfig = () => {
	const { routerConfig } = useContext(RouterConfigContext);

	const divRef = useRef<null | HTMLDivElement>(null);

	const [listInterfaces, setListInterfaces] = useState<JSX.Element[]>([]);

	const handleAdding = () => {
		const id = keyGenerator?.next()?.value ?? "1";

		const routerInterface: RouterInterface = {
			description: "",
			interfaceCableType: {
				type: "fastethernet",
				port: "",
			},
			ipAddress: "",
		};

		setListInterfaces([
			...listInterfaces,
			<Interface id={id} key={id} routerInter={routerInterface} />,
		]);
	};

	useEffect(() => {
		console.log("Detecto un cambio en el mapa");
	}, [routerConfig.interfaces]);

	return (
		<>
			<h2>Configuración de las interfaces</h2>
			<div className="interfaces container" ref={divRef}>
				{listInterfaces.map((i) => i)}
			</div>
			<button className="btn btn-success" onClick={handleAdding}>
				Add interface
			</button>
		</>
	);
};
