import { emptyRouterInterface } from "../utils/emptyInterfaces";
import {
	DHCPConfiguration,
	Router,
	RouterInterface,
} from "../types/redes-types";

export enum RouterItemConfigurable {
	hostname,
	banner,
	vty,
	console,
	encription,
	eraseInterface,
	update,
	createNewInterface,
	deleteDhcp,
	updateDhcp,
}

export type RouterActions =
	| {
			type: RouterItemConfigurable.hostname;
			payload: string;
	  }
	| {
			type: RouterItemConfigurable.deleteDhcp;
			payload: {
				id: string;
			};
	  }
	| {
			type: RouterItemConfigurable.updateDhcp;
			payload: {
				id: string;
				dhcp_inter: DHCPConfiguration;
			};
	  }
	| {
			type: RouterItemConfigurable.banner;
			payload: string;
	  }
	| {
			type: RouterItemConfigurable.vty;
			payload: boolean;
	  }
	| {
			type: RouterItemConfigurable.console;
			payload: boolean;
	  }
	| {
			type: RouterItemConfigurable.encription;
			payload: boolean;
	  }
	| {
			type: RouterItemConfigurable.eraseInterface;
			payload: {
				key: string;
			};
	  }
	| {
			type: RouterItemConfigurable.createNewInterface;
			payload: {
				key: string;
			};
	  }
	| {
			type: RouterItemConfigurable.update;
			payload: {
				key: string;
				routerInterface: RouterInterface;
			};
	  };

export const RouterReducer = (
	router: Router,
	action: RouterActions
): Router => {
	let newState: typeof router;

	switch (action.type) {
		case RouterItemConfigurable.hostname:
			return { ...router, hostname: action.payload };
		case RouterItemConfigurable.banner:
			newState = { ...router };
			newState.security.bannerMord = action.payload;
			return newState;
		case RouterItemConfigurable.vty:
			newState = { ...router };
			newState.security.vty = action.payload;
			return newState;
		case RouterItemConfigurable.console:
			newState = { ...router };
			newState.security.lineConsole = action.payload;
			return newState;
		case RouterItemConfigurable.encription:
			newState = { ...router };
			newState.security.encription = action.payload;
			return newState;
		case RouterItemConfigurable.eraseInterface:
			newState = { ...router };
			delete newState.interfaces[action.payload.key];
			return newState;

		case RouterItemConfigurable.update: {
			newState = { ...router };

			const { key, routerInterface } = action.payload;

			newState.interfaces[key] = routerInterface;

			return newState;
		}
		case RouterItemConfigurable.createNewInterface: {
			newState = { ...router };

			const { key } = action.payload;

			newState.interfaces[key] = { ...emptyRouterInterface };

			return newState;
		}
		case RouterItemConfigurable.updateDhcp: {
			const { id, dhcp_inter } = action.payload;

			newState = { ...router };

			newState.dhcp[id] = dhcp_inter;

			return newState;
		}

		case RouterItemConfigurable.deleteDhcp: {
			const { id } = action.payload;

			newState = { ...router };

			delete newState.dhcp[id];

			return newState;
		}
		default:
			return router;
	}
};
