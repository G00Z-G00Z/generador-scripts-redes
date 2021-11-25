import { Router } from "../types/redes-types";
import { emptyRouterConfiguration } from "../utils/emptyInterfaces";

export enum ListActionsTypes {
	add,
	remove,
}

export type ListActions =
	| {
			type: ListActionsTypes.add;
			payload: { key: string };
	  }
	| {
			type: ListActionsTypes.remove;
			payload: { key: string };
	  };

type State = {
	[key: string]: Router;
};

export const ListRouterReducer = (list: State, action: ListActions): State => {
	let newList: State = { ...list };

	switch (action.type) {
		case ListActionsTypes.add:
			newList[action.payload.key] = { ...emptyRouterConfiguration };
			return newList;
		case ListActionsTypes.remove:
			delete newList[action.payload.key];
			return newList;
		default:
			return list;
	}
};
