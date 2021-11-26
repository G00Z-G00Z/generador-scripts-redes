import React, { useContext, useEffect, useRef, useState } from "react";
import { RouterConfigContext } from "../context/ReactConfigContext";
import { useToggle } from "../hooks/useToggle";
import { RouterItemConfigurable } from "../reducers/RouterConfigReducer";
import { router2script } from "../utils/router2script";
import { CheckBoxes } from "./CheckBoxes";
import { RouterInterface, Router } from "../types/redes-types";

export const GenratedScript = () => {
	const { routerConfig, dispatch } = useContext(RouterConfigContext);

	const [textJson, setTextJson] = useState("");
	const [textScript, setTextScript] = useState("");
	const timeId = useRef<NodeJS.Timeout | null>(null);
	const [rowNumber, setRowNumber] = useState(20);
	const [shouldReload, toggleReload] = useToggle(true);

	useEffect(() => {
		timeId.current && clearTimeout(timeId.current);
		if (!shouldReload) return;
		timeId.current = setTimeout(() => {
			setTextJson(JSON.stringify(routerConfig, null, 2));
			setTextScript(router2script(routerConfig));
			setRowNumber(
				Math.max(
					10,
					textJson.split(/\r\n|\r|\n/).length,
					textScript.split(/\r\n|\r|\n/).length
				) + 4
			);
		}, 1000);
	}, [routerConfig, shouldReload]);

	return (
		<p className="container mt-2 border-top">
			<h2 className="text-center">
				Script de {routerConfig.hostname || "router"}
			</h2>
			<p>
				Aqui es donde se genera el script.
				<b>
					Si cambias algo en los campos de arriba, se verán reflejados aqui
					abajo.
				</b>
				Sin embargo, tu puedes cambiar lo que quieras en el script, y
				permanecerá aqui. También, puedes hacer tu propio archivo de
				configuración json. Si es válido, se generará el router.
			</p>
			<div className="row">
				<p className="offset-5 col-5">
					Adicionalmente, puedes desactivar que se genere aqui:
				</p>
				<div className="col-2 text">
					<CheckBoxes
						label="Generar Código"
						name="hot-reload"
						onChange={toggleReload}
						value={shouldReload}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-md-5 order-1 order-md-0">
					<h3>JSON generado </h3>
					<textarea
						value={textJson}
						className="form-control"
						rows={rowNumber}
						spellCheck={false}
						onChange={({ target }) => {
							let newText: string;
							let newRouter: Router;
							try {
								newRouter = JSON.parse(target.value) as Router;
								newText = router2script(newRouter);
							} catch (error) {
								return;
							}
							setTextJson(target.value);
							setTextScript(newText);

							dispatch({
								type: RouterItemConfigurable.updateAllRouter,
								payload: {
									router: newRouter,
								},
							});
						}}
					></textarea>
				</div>
				<div className="col-md-7">
					<h3>Script generado </h3>
					<textarea
						value={textScript}
						className="form-control"
						rows={rowNumber}
						onChange={({ target }) => {
							setTextScript(target.value);
						}}
						spellCheck={false}
					></textarea>
				</div>
			</div>
		</p>
	);
};
