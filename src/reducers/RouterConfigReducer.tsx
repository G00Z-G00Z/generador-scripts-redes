import { Router } from "../types/redes-types";

enum RouterItemConfigurable {
	hostname,
	banner,
	vty,
	console,
	encription,
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
	  }
	| {
			type: RouterItemConfigurable.console;
	  }
	| {
			type: RouterItemConfigurable.encription;
	  };

export const RouterReducer = (
	router: Router,
	action: RouterActions
): Router => {
	switch (action.type) {
		case RouterItemConfigurable.hostname:
			return router;
		case RouterItemConfigurable.banner:
			return router;
		case RouterItemConfigurable.vty:
			return router;
		case RouterItemConfigurable.console:
			return router;
		case RouterItemConfigurable.encription:
			return router;

		default:
			return router;
	}
};
