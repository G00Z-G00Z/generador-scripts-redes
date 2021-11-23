import { FC } from "react";

interface props {
	label: string;
	value: boolean;
	onChange: () => void;
	name: string;
}

export const CheckBoxes: FC<props> = ({ onChange, label, value, name }) => {
	return (
		<div className="form-check">
			<input
				className="form-check-input"
				type="checkbox"
				checked={value}
				name={name}
				onChange={onChange}
			/>
			<label className="form-check-label" htmlFor={name}>
				{label}
			</label>
		</div>
	);
};
