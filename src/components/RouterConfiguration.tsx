import { BasicRouterConfig } from "./BasicRouterConfig";
import { InterfaceConfig } from "./InterfaceConfig";

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
			</div>
		</>
	);
};
