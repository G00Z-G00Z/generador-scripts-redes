import React, { FC } from "react";
import { useState, useContext } from "react";
import { CheckBoxes } from "./CheckBoxes";
import { useForm } from "../hooks/useForm";
import { useEffect } from "react";
import { RouterConfigContext } from "../context/ReactConfigContext";
import { RouterItemConfigurable } from "../reducers/RouterConfigReducer";
import { RouterInterface, RouterInterfaceCables } from "../types/redes-types";

type CableTypes = "serial" | "fastethernet" | "gigabitethernet";

export const Interface: FC<{ id: string }> = ({ id }) => {
	const { dispatch } = useContext(RouterConfigContext);
	const [cableType, setCableType] = useState<CableTypes>("fastethernet");

	const [isFemale, setIsFemale] = useState(false);

	const { onChange, portNumber, description, ipAddress, ipMask } = useForm({
		portNumber: "",
		description: "",
		ipAddress: "",
		ipMask: "",
	});

	// Esto borra la ip
	useEffect(() => {
		return () => {
			dispatch({
				type: RouterItemConfigurable.eraseInterface,
				payload: id,
			});
		};
	}, []);

	useEffect(() => {
		if (portNumber && ipAddress && ipMask) {
			const cableInterface: RouterInterfaceCables =
				cableType === "serial"
					? {
							isFemale,
							type: cableType,
							port: portNumber,
					  }
					: {
							type: cableType,
							port: portNumber,
					  };

			const routerInterface: RouterInterface = {
				description,
				ipAddress: `${ipAddress} ${ipMask}`,
				interfaceCableType: cableInterface,
			};

			dispatch({
				type: RouterItemConfigurable.addInterface,
				payload: { routerInterface, key: id },
			});
		}
	}, [
		portNumber,
		ipAddress,
		cableType,
		ipMask,
		description,
		isFemale,
		dispatch,
		id,
	]);

	return (
		<div>
			<strong>Select Type of cable</strong>
			<select
				className="form-select"
				aria-label="Default select example"
				value={cableType}
				// @ts-ignore
				onChange={(e) => setCableType(e.target.value as CableTypes)}
			>
				<option selected value={"fastethernet"}>
					Fast Ethernet
				</option>
				<option value={"serial"}>Serial </option>
				<option value={"gigabitethernet"}>Gigabit</option>
			</select>
			{cableType === "serial" && (
				<CheckBoxes
					label="Es hembra?"
					value={isFemale}
					name="es-hembra"
					onChange={() => {
						setIsFemale(!isFemale);
					}}
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
				value={portNumber}
				onChange={(e) => {
					onChange(e.target.value, "portNumber");
				}}
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
					onChange={(e) => {
						onChange(e.target.value, "ipAddress");
					}}
				/>
				<span className="input-group-text">/</span>
				<input
					type="text"
					className="form-control"
					name="ipMask"
					placeholder="ipMask del router"
					value={ipMask}
					onChange={(e) => {
						onChange(e.target.value, "ipMask");
					}}
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
				onChange={(e) => {
					onChange(e.target.value, "description");
				}}
			/>
			<button
				className="btn btn-danger"
				onClick={() => {
					console.log("Esoty intentando borrar");
					dispatch({
						type: RouterItemConfigurable.eraseInterface,
						payload: id,
					});
				}}
			>
				Delete interface
			</button>
		</div>
	);
};
