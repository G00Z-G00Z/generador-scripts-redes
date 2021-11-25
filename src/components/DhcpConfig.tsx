import React, { FC, useContext, useEffect } from "react";
import { CheckBoxes } from "./CheckBoxes";
import { DHCPConfiguration } from "../types/redes-types";
import { useForm } from "../hooks/useForm";
import { InputUseForm } from "./InputUseForm";
import { RouterConfigContext } from "../context/ReactConfigContext";
import { RouterItemConfigurable } from "../reducers/RouterConfigReducer";

interface Props {
	id_interface: string;
	dhcpInter: DHCPConfiguration;
	id_dhcp: string;
}

export const DhcpConfig: FC<Props> = ({ id_interface, id_dhcp, dhcpInter }) => {
	const { dispatch } = useContext(RouterConfigContext);

	const {
		defaultRouter,
		dnsServer,
		network,
		poolName,
		excluded,
		formulario,
		onChange,
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
			type: RouterItemConfigurable.updateDhcp,
			payload: {
				dhcp_id: id_dhcp,
				interface_id: id_interface,
				dhcp_inter: {
					network,
					defaultRouter,
					dnsServer,
					poolName,
					excluded: excludedAdds,
				},
			},
		});
	}, [
		defaultRouter,
		dispatch,
		dnsServer,
		excluded,
		network,
		poolName,
		id_dhcp,
		id_interface,
	]);

	return (
		<>
			<h5>DHCP Configuration {poolName ?? ""}</h5>
			<div className="dhcp-config-form">
				<InputUseForm
					label="Pon el nombre del pool name"
					onChange={onChange}
					value={poolName}
					placeHolder={"Pon el poolName"}
					name={"poolName"}
				/>
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
					label="Pon las ip excluidas, separadas por commas"
					onChange={onChange}
					value={excluded}
					placeHolder={"Pon el excluded"}
					name={"excluded"}
				/>
			</div>
		</>
	);
};
