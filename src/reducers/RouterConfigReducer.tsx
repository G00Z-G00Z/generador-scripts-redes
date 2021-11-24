import { Router, RouterInterface } from "../types/redes-types";

export enum RouterItemConfigurable {
	hostname,
	banner,
	vty,
	console,
	encription,
	eraseInterface,
	addInterface,
}

export type RouterActions =
	| {
			type: RouterItemConfigurable.hostname;
			payload: string;
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
			payload: string;
	  }
	| {
			type: RouterItemConfigurable.addInterface;
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
			router.interfaces.delete(action.payload);
			return router;

		case RouterItemConfigurable.addInterface:
			router.interfaces.set(action.payload.key, action.payload.routerInterface);
			return router;

		default:
			return router;
	}
};
