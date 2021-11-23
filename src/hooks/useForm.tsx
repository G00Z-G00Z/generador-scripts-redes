import { useState } from "react";

export const useForm = <T extends Object>(initialState: T) => {
	const [formulario, setFormulario] = useState<T>(initialState);

	const onChange = (newValue: string, campo: keyof T) => {
		setFormulario({
			...formulario,
			[campo]: newValue,
		});
	};

	return {
		...formulario,
		formulario,
		onChange,
	};
};

/** Example
 * export const Formularios = () => {
	const { email, password, onChange, formulario } = useForm({
		password: "871984",
		email: "josifj@uiwfh.com",
	});

	return (
		<>
			<h3>Formularios</h3>
			<input
				type="text"
				className="form-control my-2"
				placeholder="Tu password"
				value={password}
				onChange={(e) => onChange(e.target.value, "password")}
			/>
			<input
				type="email"
				className="form-control"
				placeholder="Tu email"
				value={email}
				onChange={(e) => onChange(e.target.value, "email")}
			/>
			<p>
				<pre>{JSON.stringify(formulario)}</pre>
			</p>
		</>
	);
};
 * 
 * 
 */
