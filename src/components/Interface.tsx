import React, { FC } from "react";
import { useState, useContext } from "react";
import { CheckBoxes } from "./CheckBoxes";
import { useForm } from "../hooks/useForm";
import { useEffect } from "react";
import { RouterConfigContext } from "../context/ReactConfigContext";
import { RouterItemConfigurable } from "../reducers/RouterConfigReducer";
import { RouterInterface, RouterInterfaceCables } from "../types/redes-types";

type CableTypes = "serial" | "fastethernet" | "gigabitethernet";

export const Interface: FC<{ id: string; routerInter: RouterInterface }> = ({
	id,
	routerInter,
}) => {
	const { description, interfaceCableType, ipAddress } = routerInter;

	const { dispatch } = useContext(RouterConfigContext);
	// const [cableType, setCableType] = useState<CableTypes>("fastethernet");

	// const [isFemale, setIsFemale] = useState(false);

	const { onChange, ipMask } = useForm({
		ipMask: "",
	});

	// // Esto borra la ip
	// useEffect(() => {
	// 	return () => {
	// 		dispatch({
	// 			type: RouterItemConfigurable.eraseInterface,
	// 			payload: id,
	// 		});
	// 	};
	// }, []);

	// useEffect(() => {
	// 	if (portNumber && ipAddress && ipMask) {
	// 		const cableInterface: RouterInterfaceCables =
	// 			cableType === "serial"
	// 				? {
	// 						isFemale,
	// 						type: cableType,
	// 						port: portNumber,
	// 				  }
	// 				: {
	// 						type: cableType,
	// 						port: portNumber,
	// 				  };

	// 		const routerInterface: RouterInterface = {
	// 			description,
	// 			ipAddress: `${ipAddress} ${ipMask}`,
	// 			interfaceCableType: cableInterface,
	// 		};

	// 		dispatch({
	// 			type: RouterItemConfigurable.addInterface,
	// 			payload: { routerInterface, key: id },
	// 		});
	// 	}
	// }, [
	// 	portNumber,
	// 	ipAddress,
	// 	cableType,
	// 	ipMask,
	// 	description,
	// 	isFemale,
	// 	dispatch,
	// 	id,
	// ]);

	return (
		<div>
			<strong>Select Type of cable</strong>
			<select
				className="form-select"
				aria-label="Default select example"
				value={interfaceCableType.type}
				// @ts-ignore
				onChange={(e) => {}}
			>
				<option value={"fastethernet"}>Fast Ethernet</option>
				<option value={"serial"}>Serial </option>
				<option value={"gigabitethernet"}>Gigabit</option>
			</select>
			{interfaceCableType.type === "serial" && (
				<CheckBoxes
					label="Es hembra?"
					value={interfaceCableType.isFemale}
					name="es-hembra"
					onChange={() => {}}
				/>
			)}
			<label htmlFor="portnumber" className="form-label">
				Poner el port number
			</label>
			<input
				type="text"
				className="form-control"
				name="portnumber"
				placeholder="portnumber del router"
				value={interfaceCableType.port}
				onChange={() => {}}
			/>
			<strong>Ip address</strong> <br />
			<small>Pones la direccion normal y luego pones diagonal algo</small>
			<div className="input-group">
				<input
					type="text"
					className="form-control"
					name="ipAddress"
					placeholder="ipAddress del router"
					value={ipAddress}
					onChange={(e) => {}}
				/>
				<span className="input-group-text">/</span>
				<input
					type="text"
					className="form-control"
					name="ipMask"
					placeholder="ipMask del router"
					value={ipMask}
					onChange={(e) => {}}
				/>
			</div>
			<label htmlFor="banner" className="form-label">
				Poner la descripción
			</label>
			<input
				type="text"
				className="form-control"
				name="description"
				placeholder="description del router"
				value={description}
				onChange={(e) => {}}
			/>
		</div>
	);
};
