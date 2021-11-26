import { BasicRouterConfig } from "./BasicRouterConfig";
import { InterfaceConfig } from "./InterfaceConfig";

export const RouterConfiguration = () => {
	return (
		<>
			<div className="container">
				<div className="row border-top">
					<BasicRouterConfig />
				</div>
				<div className="row border-top">
					<InterfaceConfig />
				</div>
			</div>
		</>
	);
};
