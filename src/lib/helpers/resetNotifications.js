import { notifications } from '$lib/stores/notifications';

export function resetNotifications() {
	notifications.reset();
}
