import React, { FC, useContext, useEffect } from "react";
import { RouterInterface } from "../types/redes-types";
import { useForm } from "../hooks/useForm";
import { InputUseForm } from "./InputUseForm";
import { RouterConfigContext } from "../context/ReactConfigContext";
import { RouterItemConfigurable } from "../reducers/RouterConfigReducer";

interface Props {
	id_interface: string;
	routerInterface: RouterInterface;
}

export const DhcpConfig: FC<Props> = ({ id_interface, routerInterface }) => {
	const { dispatch } = useContext(RouterConfigContext);

	const { dhcp: dhcpInter } = routerInterface;

	const { dnsServer, poolName, excluded, formulario, onChange } = useForm({
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
				key: id_interface,
				routerInterface: {
					...routerInterface,
					dhcp: {
						dnsServer,
						poolName,
						excluded: excludedAdds,
					},
				},
			},
		});
	}, [dispatch, dnsServer, excluded, poolName]);

	return (
		<>
			<h5>DHCP Configuration {`DHCP::${poolName}` ?? ""}</h5>
			<div className="dhcp-config-form">
				<InputUseForm
					label="Pon el nombre del pool name"
					onChange={onChange}
					value={poolName}
					placeHolder={"Pon el poolName"}
					name={"poolName"}
				/>

				<InputUseForm
					label="Pon la ip del dnsServer"
					onChange={onChange}
					value={dnsServer}
					placeHolder={"Pon el dnsServer"}
					name={"dnsServer"}
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
