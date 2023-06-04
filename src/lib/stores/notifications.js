import { writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';

function createNotifications() {
	const { subscribe, set, update } = localStorageStore('notifications', 0);

	return {
		subscribe,
		increment: () => update((n) => n + 1),
		decrement: () => update((n) => n - 1),
		reset: () => set(0)
	};
}

export const notifications = createNotifications();
