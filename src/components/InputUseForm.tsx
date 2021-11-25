import React, { FC } from "react";

interface Props {
	name: string;
	label: string;
	placeHolder: string;
	value: string;
	onChange: Function;
}

export const InputUseForm: FC<Props> = ({
	name,
	label,
	placeHolder,
	value,
	onChange,
}) => {
	return (
		<>
			<label htmlFor={name} className="form-label">
				{label}
			</label>
			<input
				type="text"
				className="form-control"
				name={name}
				placeholder={placeHolder}
				value={value}
				onChange={(e) => {
					onChange(e.target.value, name);
				}}
			/>
		</>
	);
};
