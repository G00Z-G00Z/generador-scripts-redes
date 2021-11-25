import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T) {
	return useStorage(key, defaultValue, window.localStorage);
}
export function useSessionStorage<T>(key: string, defaultValue: T) {
	return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage<T>(key: string, defaultValue: T, storageObject: Storage) {
	const [value, setValue] = useState<T | undefined>(() => {
		const jsonValue = storageObject.getItem(key);
		if (jsonValue !== null) return JSON.parse(jsonValue) as T;
		return defaultValue;
	});

	useEffect(() => {
		if (value === undefined) return storageObject.removeItem(key);
		storageObject.setItem(key, JSON.stringify(value));
	}, [key, value, storageObject]);

	const removeValue = useCallback(() => {
		setValue(undefined);
	}, []);

	return { value, removeValue, setValue };
}
