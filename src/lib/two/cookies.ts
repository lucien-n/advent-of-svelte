import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const createCookiesStore = (storageKey: string) => {
	const { subscribe, set, update } = writable<number>(0);

	if (browser) set(parseInt(localStorage.getItem(storageKey) ?? '0'));

	const saveToStorage = () => {
		let count = 0;
		subscribe((cookies) => (count = cookies));
		localStorage.setItem(storageKey, count.toString());
	};

	const setCookies = (count: number) => {
		set(count);
		saveToStorage();
	};

	const reset = () => setCookies(0);

	const increment = () => {
		update((current: number) => current + 1);
		saveToStorage();
	};

	const decrement = () => {
		update((current: number) => current - 1);
		saveToStorage();
	};

	return {
		subscribe,
		set,
		update,
		setCookies,
		reset,
		increment,
		decrement
	};
};
