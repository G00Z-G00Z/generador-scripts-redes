import React, { useContext } from "react";
import { RouterConfigContext } from "../context/ReactConfigContext";
import { useForm } from "../hooks/useForm";
import { CheckBoxes } from "./CheckBoxes";
import { useToggle } from "../hooks/useToggle";

export const RouterConfiguration = () => {
	const router = useContext(RouterConfigContext);

	const { hostname, onChange } = useForm({
		hostname: "",
	});

	const [encription, toggleEncription] = useToggle(false);

	return (
		<>
			<h2>Configuración del router</h2>
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
					router.hostname = e.target.value;
					onChange(e.target.value, "hostname");
				}}
			/>
			{/* Chekc boxes */}

			<CheckBoxes
				label={"Tiene encription"}
				name={"encription"}
				value={router.security.encription}
				onChange={() => {
					toggleEncription();
					router.security.encription = encription;
				}}
			/>

			<pre>
				Este es el hostname: {router.hostname} <br />
				Esta es la encription :{" "}
				{router.security.encription ? "Si hay" : " No hay"}
			</pre>
		</>
	);
};
