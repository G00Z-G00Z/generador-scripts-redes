import { BasicRouterConfig } from "./BasicRouterConfig";
import { InterfaceConfig } from "./InterfaceConfig";
import { DhcpConfigurationScreen } from "./DhcpConfigurationScreen";

export const RouterConfiguration = () => {
	return (
		<>
			<div className="container">
				<div className="row">
					<BasicRouterConfig />
				</div>
				<div className="row">
					<InterfaceConfig />
				</div>
				<div className="row">
					<DhcpConfigurationScreen />
				</div>
			</div>
		</>
	);
};
