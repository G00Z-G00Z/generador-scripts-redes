import React, { useContext } from "react";
import { RouterConfigContext } from "../context/ReactConfigContext";
import { useForm } from "../hooks/useForm";
import { CheckBoxes } from "./CheckBoxes";
import { useToggle } from "../hooks/useToggle";
export const BasicRouterConfig = () => {
	const router = useContext(RouterConfigContext);

	const { hostname, onChange, banner } = useForm({
		hostname: "",
		banner: "",
	});

	const [encription, toggleEncription] = useToggle(false);
	const [vty, togglevty] = useToggle(false);
	const [lineConsole, togglelineConsole] = useToggle(false);

	return (
		<>
			<h2>Configuración básica</h2>
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
			<label htmlFor="banner" className="form-label">
				Poner el banner
			</label>
			<input
				type="text"
				className="form-control"
				name="banner"
				placeholder="banner del router"
				value={banner}
				onChange={(e) => {
					router.security.bannerMord = e.target.value;
					onChange(e.target.value, "banner");
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
			<CheckBoxes
				label={"Tiene line console security"}
				name={"lineconsole"}
				value={router.security.lineConsole}
				onChange={() => {
					togglelineConsole();
					router.security.lineConsole = lineConsole;
				}}
			/>
			<CheckBoxes
				label={"Tiene vty"}
				name={"vty"}
				value={router.security.vty}
				onChange={() => {
					togglevty();
					router.security.vty = vty;
				}}
			/>
		</>
	);
};
