import React, { useContext, useEffect, useRef, useState } from "react";
import { RouterConfigContext } from "../context/ReactConfigContext";

export const GenratedScript = () => {
	const { routerConfig } = useContext(RouterConfigContext);

	const [textJson, setTextJson] = useState("");
	const [textScript, setTextScript] = useState("Todavía nada");
	const timeId = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		timeId.current && clearTimeout(timeId.current);

		timeId.current = setTimeout(() => {
			setTextJson(JSON.stringify(routerConfig, null, 2));
		}, 1000);
	}, [routerConfig]);

	return (
		<p className="container mt-2">
			<h2 className="text-center">Script de {routerConfig.hostname || ""}</h2>
			<div className="row">
				<h3 className="col-5">JSON generado </h3>
				<h3 className="col-7">Script generado </h3>
			</div>
			<div className="row">
				<pre className="col-4 text-break ">{textJson}</pre>
				<pre className="col-7 text-break">{textScript}</pre>
			</div>
		</p>
	);
};
