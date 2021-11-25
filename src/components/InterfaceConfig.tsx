import React, { useRef } from "react";
import { Interface } from "./Interface";
import { useContext } from "react";
import { RouterConfigContext } from "../context/ReactConfigContext";
import { useEffect } from "react";
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
			<h3>Configuración de las interfaces</h3>
			<div className="interfaces" ref={divRef}>
				{Array.from(routerConfig.interfaces, (pair) => {
					const [key, inter] = pair;

					return (
						<div key={key} className="interface row">
							<div className="my-1">
								<Interface id={key} routerInter={inter} />
								<button
									className="btn btn-danger col-4 offset-8"
									onClick={() => {
										dispatch({
											type: RouterItemConfigurable.eraseInterface,
											payload: {
												key,
											},
										});
									}}
								>
									Eliminar Interface
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
