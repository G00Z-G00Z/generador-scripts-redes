import React, { FC } from "react";
import { useState, useContext } from "react";
import { CheckBoxes } from "./CheckBoxes";
import { useForm } from "../hooks/useForm";
import { useEffect } from "react";
import { RouterConfigContext } from "../context/ReactConfigContext";
import { RouterItemConfigurable } from "../reducers/RouterConfigReducer";
import { RouterInterface, RouterInterfaceCables } from "../types/redes-types";
import { useToggle } from "../hooks/useToggle";
import { DhcpConfig } from "./DhcpConfig";
import { InputUseForm } from "./InputUseForm";

type CableTypes = "serial" | "fastethernet" | "gigabitethernet";

export const Interface: FC<{ id: string; routerInter: RouterInterface }> = ({
	id,
	routerInter,
}) => {
	const { description, interfaceCableType, ipMask, ipAddress } = routerInter;

	const { dispatch } = useContext(RouterConfigContext);

	const [type, setType] = useState(interfaceCableType.type);

	const { onChange, ipAdd, ipMas, descriptionForm, port } = useForm({
		ipMas: ipMask,
		ipAdd: ipAddress,
		port: interfaceCableType.port,
		descriptionForm: description,
	});

	const [isFemale, toggleIsFemale] = useToggle(
		interfaceCableType.type === "serial" && interfaceCableType.isFemale
	);

	useEffect(() => {
		const cableInter: RouterInterfaceCables =
			type === "serial"
				? {
						type: "serial",
						isFemale,
						port,
				  }
				: {
						type,

						port,
				  };

		dispatch({
			type: RouterItemConfigurable.update,
			payload: {
				key: id,
				routerInterface: {
					...routerInter,
					description: descriptionForm,
					interfaceCableType: cableInter,
					ipAddress: ipAdd,
					ipMask: ipMas,
				},
			},
		});
	}, [isFemale, descriptionForm, dispatch, id, ipAdd, ipMas, port, type]);

	return (
		<div className="container">
			<div className="row">
				<div className="col-6">
					<strong>Select Type of cable</strong>
					<select
						className="form-select"
						aria-label="Default select example"
						value={type}
						onChange={(e) => setType(e.target.value as CableTypes)}
					>
						<option value={"fastethernet"}>Fast Ethernet</option>
						<option value={"serial"}>Serial </option>
						<option value={"gigabitethernet"}>Gigabit</option>
					</select>
					{type === "serial" && (
						<CheckBoxes
							label="Es hembra?"
							value={isFemale}
							name="es-hembra"
							onChange={() => {
								toggleIsFemale();
							}}
						/>
					)}
				</div>
				<div className="col-6">
					<InputUseForm
						label="Pon el port number"
						name="port"
						onChange={onChange}
						placeHolder="Port number"
						value={port}
					/>
				</div>
				<div>
					<InputUseForm
						label="Pon el description"
						name="descriptionForm"
						onChange={onChange}
						placeHolder="description"
						value={descriptionForm}
					/>
				</div>
			</div>
			<strong>Ip address</strong> <br />
			<small>Pones la direccion normal y luego pones diagonal algo</small>
			<div className="input-group">
				<div className="col-9">
					<input
						type="text"
						className="form-control col-9"
						name="ipAddress"
						placeholder="ipAddress del router"
						value={ipAdd}
						onChange={(e) => {
							onChange(e.target.value, "ipAdd");
						}}
					/>
				</div>
				<span className="input-group-text">/</span>
				<input
					type="text"
					className="form-control"
					name="ipMask"
					placeholder="ex. 24"
					value={ipMas}
					onChange={(e) => {
						onChange(e.target.value, "ipMas");
					}}
				/>
			</div>
			{routerInter.interfaceCableType.type !== "serial" && (
				<div className="dhcp-config-container mt-4">
					<DhcpConfig id_interface={id} routerInterface={routerInter} />
				</div>
			)}
		</div>
	);
};
