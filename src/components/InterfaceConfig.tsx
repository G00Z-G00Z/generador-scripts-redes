import React, { useRef } from "react";
import { Interface } from "./Interface";
import { useContext } from "react";
import { RouterConfigContext } from "../context/ReactConfigContext";
import { RouterItemConfigurable } from "../reducers/RouterConfigReducer";
import { keyGeneratorFunc } from "../utils/keyGenerator";

const keyGenerator = keyGeneratorFunc();

export const InterfaceConfig = () => {
	const { routerConfig, dispatch } = useContext(RouterConfigContext);

	const divRef = useRef<null | HTMLDivElement>(null);

	const handleAdding = () => {
		const key = (keyGenerator?.next()?.value as string) ?? "1";

		dispatch({
			type: RouterItemConfigurable.createNewInterface,
			payload: {
				key,
			},
		});
	};

	return (
		<>
			<h3 className="text-center mt-3 border-bottom">
				Configuración de las interfaces
			</h3>
			<div className="interfaces" ref={divRef}>
				{Object.keys(routerConfig.interfaces).map((key) => {
					const inter = routerConfig.interfaces[key];
					return (
						<div key={key} className="interface row border-bottom p-3 p-md-1">
							<div className="my-1">
								<Interface id={key} routerInter={inter} />
								<button
									className="btn btn-danger col-4 offset-4 mt-2"
									onClick={() => {
										dispatch({
											type: RouterItemConfigurable.eraseInterface,
											payload: {
												key,
											},
										});
									}}
								>
									Eliminar interface
								</button>
							</div>
						</div>
					);
				})}
			</div>
			<button
				className="btn btn-success col-6 offset-3 mt-2"
				onClick={handleAdding}
			>
				Add interface
			</button>
		</>
	);
};
