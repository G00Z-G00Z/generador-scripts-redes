import React, { useContext } from "react";
import { RouterConfigContext } from "../context/ReactConfigContext";
import { RouterItemConfigurable } from "../reducers/RouterConfigReducer";
import { keyGeneratorFunc } from "../utils/keyGenerator";
import { DhcpConfig } from "./DhcpConfig";
import { emptyDhcpConfiguration } from "../utils/emptyInterfaces";

const keyGenerator = keyGeneratorFunc();
export const DhcpConfigurationScreen = () => {
	const { dispatch, routerConfig } = useContext(RouterConfigContext);

	const { dhcp } = routerConfig;

	return (
		<div className="dhcp-config-container mt-4">
			{Object.keys(dhcp).map((key) => {
				const config = dhcp[key];
				return (
					<div key={key}>
						<DhcpConfig id={key} dhcpInter={config} />
						<button
							className="btn btn-danger col-4 offset-8 mt-2"
							onClick={() => {
								dispatch({
									type: RouterItemConfigurable.deleteDhcp,
									payload: {
										id: key,
									},
								});
							}}
						>
							Delete dhcp
						</button>
					</div>
				);
			})}
			<button
				className="btn btn-success"
				onClick={() => {
					let keyGenerated: string;
					do {
						keyGenerated = keyGenerator.next()?.value ?? "1";
					} while (dhcp[keyGenerated]);

					dispatch({
						type: RouterItemConfigurable.updateDhcp,
						payload: {
							id: keyGenerated,
							dhcp_inter: { ...emptyDhcpConfiguration },
						},
					});
				}}
			>
				Add new dhcp
			</button>
		</div>
	);
};
