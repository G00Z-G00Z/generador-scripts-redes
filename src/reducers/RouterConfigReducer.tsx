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
	setRip,
}

export type RouterActions =
	| {
			type: RouterItemConfigurable.hostname;
			payload: string;
	  }
	| {
			type: RouterItemConfigurable.deleteDhcp;
			payload: {
				interface_id: string;
				dhcp_id: string;
			};
	  }
	| {
			type: RouterItemConfigurable.setRip;
			payload: {
				value: boolean;
			};
	  }
	| {
			type: RouterItemConfigurable.updateDhcp;
			payload: {
				interface_id: string;
				dhcp_id: string;
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
		case RouterItemConfigurable.setRip:
			newState = { ...router };
			newState.hasRip = action.payload.value;
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
			const { dhcp_id, interface_id, dhcp_inter } = action.payload;

			newState = { ...router };
			console.log("Estoy añadiendo una");

			if (!newState.interfaces?.[interface_id]) return router;

			newState.interfaces[interface_id].dhcp[dhcp_id] = dhcp_inter;

			return newState;
		}

		case RouterItemConfigurable.deleteDhcp: {
			const { dhcp_id, interface_id } = action.payload;

			newState = { ...router };

			delete newState.interfaces[interface_id].dhcp[dhcp_id];

			return newState;
		}
		default:
			return router;
	}
};
