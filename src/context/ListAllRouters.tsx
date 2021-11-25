import { createContext } from "react";

import { ListActions } from "../reducers/ListRouterReducer";
import { Router } from "../types/redes-types";

export const RouterListContext = createContext<{
	list: Router[];
	dispatch: (action: ListActions) => void;
}>({
	list: [],
	dispatch: (action: ListActions) => {},
});
