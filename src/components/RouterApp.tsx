import React, { useEffect, useState } from "react";
import { useSessionStorage } from "../hooks/useLocalStorage";
import { Router } from "../types/redes-types";
import { keyGeneratorFunc } from "../utils/keyGenerator";
import { RouterConfigurationScreen } from "./RouterConfigurationScreen";
import { emptyRouterConfiguration } from "../utils/emptyInterfaces";

const keyGenerator = keyGeneratorFunc();

type ListOfRouters = {
	[key: string]: Router;
};

export const RouterApp = () => {
	const [value, setValue] = useSessionStorage<ListOfRouters>(
		"routerConfig",
		{}
	);

	const [allRouters, setAllRouters] = useState<ListOfRouters>(value ?? {});

	const updateRouter = (key: string, r: Router) => {
		setAllRouters((list) => {
			const newList = { ...list };
			newList[key] = r;
			return newList;
		});
	};

	useEffect(() => {
		setValue(allRouters);
		console.log("Algo se esta cambiando");
	}, [allRouters, setValue]);

	return (
		<div className="container">
			{Object.entries(allRouters).map(([key, router]) => {
				console.log("Debería anadir un router aqui");
				return (
					<div className="container my-3" key={key}>
						<RouterConfigurationScreen
							routerConfigParameters={router}
							id={key}
							updateRouter={updateRouter}
						/>
						<button
							className="btn btn-danger col-4 offset-4"
							onClick={() => {
								setAllRouters((r) => {
									const newRouter = { ...r };
									delete newRouter[key];
									return newRouter;
								});
							}}
						>
							Delete {router.hostname || "Router"}
						</button>
					</div>
				);
			})}

			<button
				className="btn btn-success col-10 offset-1 mb-5"
				onClick={() => {
					let newKey = "";

					do {
						newKey = (keyGenerator.next()?.value ?? "1") as string;
					} while (allRouters[newKey]);

					setAllRouters({
						...allRouters,
						[newKey]: { ...emptyRouterConfiguration },
					});
				}}
			>
				Add Router
			</button>
		</div>
	);
};
