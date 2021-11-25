import React, { FC, useContext, useEffect } from "react";
import { useToggle } from "../hooks/useToggle";
import { CheckBoxes } from "./CheckBoxes";
import { DHCPConfiguration, RouterInterface } from "../types/redes-types";
import { useForm } from "../hooks/useForm";
import { InputUseForm } from "./InputUseForm";
import { RouterConfigContext } from "../context/ReactConfigContext";
import { RouterItemConfigurable } from "../reducers/RouterConfigReducer";

interface Props {
	id_interface: string;
	routerInter: DHCPConfiguration;
	id_dhcp: string;
}

export const DhcpConfig: FC<Props> = ({ id, routerInter: dhcpInter }) => {
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
		clearFormulario,
	} = useForm({
		network: dhcpInter.network,
		defaultRouter: dhcpInter.defaultRouter,
		dnsServer: dhcpInter.dnsServer,
		poolName: dhcpInter.poolName,
		excluded: dhcpInter.excluded.join(","),
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
					...dhcpInter,
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

	useEffect(() => {
		if (!display) {
			dispatch({
				type: RouterItemConfigurable.update,
				payload: {
					key: id,
					routerInterface: {
						...dhcpInter,
						dhcp: {
							network: "",
							defaultRouter: "",
							dnsServer: "",
							poolName: "",
							excluded: [],
						},
					},
				},
			});
			clearFormulario();
		}
	}, [display]);
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
