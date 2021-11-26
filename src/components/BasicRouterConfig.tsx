import React, { useContext } from "react";
import { RouterConfigContext } from "../context/ReactConfigContext";
import { CheckBoxes } from "./CheckBoxes";
import { RouterItemConfigurable } from "../reducers/RouterConfigReducer";
export const BasicRouterConfig = () => {
	const { routerConfig, dispatch } = useContext(RouterConfigContext);

	const { hostname, security, hasRip } = routerConfig;

	const { bannerMord, encription, lineConsole, vty } = security;

	return (
		<>
			<h3>Configuración básica</h3>
			<div className="col col-6">
				<label htmlFor="hostname" className="form-label">
					Poner el hostname
				</label>
				<input
					type="text"
					className="form-control"
					name="hostname"
					placeholder="Hostname del router"
					value={hostname}
					onChange={(e) => {
						dispatch({
							type: RouterItemConfigurable.hostname,
							payload: e.target.value,
						});
					}}
				/>
				<label htmlFor="banner" className="form-label">
					Poner el banner
				</label>
				<input
					type="text"
					className="form-control"
					name="banner"
					placeholder="banner del router"
					value={bannerMord}
					onChange={(e) => {
						dispatch({
							type: RouterItemConfigurable.banner,
							payload: e.target.value,
						});
					}}
				/>
			</div>
			{/* Chekc boxes */}

			<div className="col col-6">
				<CheckBoxes
					label={"Tiene encription"}
					name={"encription"}
					value={encription}
					onChange={() => {
						dispatch({
							type: RouterItemConfigurable.encription,
							payload: !encription,
						});
					}}
				/>
				<CheckBoxes
					label={"Tiene line console security"}
					name={"lineconsole"}
					value={lineConsole}
					onChange={() => {
						dispatch({
							type: RouterItemConfigurable.console,
							payload: !lineConsole,
						});
					}}
				/>
				<CheckBoxes
					label={"Tiene vty"}
					name={"vty"}
					value={vty}
					onChange={() => {
						dispatch({
							type: RouterItemConfigurable.vty,
							payload: !vty,
						});
					}}
				/>
				<CheckBoxes
					label={"Tiene rip"}
					name={"vty"}
					value={hasRip}
					onChange={() => {
						dispatch({
							type: RouterItemConfigurable.setRip,
							payload: { value: !hasRip },
						});
					}}
				/>
			</div>
		</>
	);
};
