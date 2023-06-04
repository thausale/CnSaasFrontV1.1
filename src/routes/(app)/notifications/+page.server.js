import { NotificationsController } from '$lib/api/NotificationsController.js';

export const load = async ({ depends }) => {
	try {
		const notifications = NotificationsController.getNotifications();
		return notifications;
	} catch (error) {
		console.error(error);
	}
	depends('notification');
};
