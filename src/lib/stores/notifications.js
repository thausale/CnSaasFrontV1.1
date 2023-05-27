import { writable } from 'svelte/store';

// Create a writable store for the notification count
export const notificationCount = writable(0);

// Function to update the notification count
export function incrementNotificationCount() {
	notificationCount.update((count) => count + 1);
}
