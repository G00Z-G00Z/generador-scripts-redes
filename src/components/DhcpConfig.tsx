import React, { FC, useContext, useEffect } from "react";
import { useToggle } from "../hooks/useToggle";
import { CheckBoxes } from "./CheckBoxes";
import { RouterInterface } from "../types/redes-types";
import { useForm } from "../hooks/useForm";
import { InputUseForm } from "./InputUseForm";
import { RouterConfigContext } from "../context/ReactConfigContext";
import { RouterItemConfigurable } from "../reducers/RouterConfigReducer";

interface Props {
	id: string;
	routerInter: RouterInterface;
}

export const DhcpConfig: FC<Props> = ({ id, routerInter }) => {
	const { dispatch } = useContext(RouterConfigContext);

	const [display, toggle] = useToggle(false);

	const {
		defaultRouter,
		dnsServer,
		network,
		poolName,
		excluded,
		formulario,
		onChange,
	} = useForm({
		network: routerInter.dhcp.network,
		defaultRouter: routerInter.dhcp.defaultRouter,
		dnsServer: routerInter.dhcp.dnsServer,
		poolName: routerInter.dhcp.poolName,
		excluded: routerInter.dhcp.excluded.join(","),
	});

	useEffect(() => {
		const excludedAdds = formulario.excluded
			.split(",")
			.map((cosa) => cosa.trim());

		dispatch({
			type: RouterItemConfigurable.update,
			payload: {
				key: id,
				routerInterface: {
					...routerInter,
					dhcp: {
						network,
						defaultRouter,
						dnsServer,
						poolName,
						excluded: excludedAdds,
					},
				},
			},
		});
	}, [defaultRouter, dispatch, dnsServer, excluded, id, network, poolName]);

	return (
		<>
			<div className="container dhcp-config">
				<CheckBoxes
					onChange={toggle}
					value={display}
					label="Configuración dhcp"
					name="toggle-dhcp"
				/>

				{display && (
					<div>
						<InputUseForm
							label="Pon el default router"
							onChange={onChange}
							value={defaultRouter}
							placeHolder={"Pon el defaultRouter"}
							name={"defaultRouter"}
						/>
						<InputUseForm
							label="Pon la ip del dnsServer"
							onChange={onChange}
							value={dnsServer}
							placeHolder={"Pon el dnsServer"}
							name={"dnsServer"}
						/>
						<InputUseForm
							label="Pon la ip del network"
							onChange={onChange}
							value={network}
							placeHolder={"Pon el network"}
							name={"network"}
						/>
						<InputUseForm
							label="Pon el nombre del pool name"
							onChange={onChange}
							value={poolName}
							placeHolder={"Pon el poolName"}
							name={"poolName"}
						/>
						<InputUseForm
							label="Pon las ip excluidas, separadas por commas"
							onChange={onChange}
							value={excluded}
							placeHolder={"Pon el excluded"}
							name={"excluded"}
						/>
					</div>
				)}
			</div>
		</>
	);
};
