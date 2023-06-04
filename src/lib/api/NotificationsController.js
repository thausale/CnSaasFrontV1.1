import { PUBLIC_URI } from '$env/static/public';
import { serverEventHandler } from '$lib/helpers/serverEvents';

class NotificationsHandler {
	constructor(baseURL) {
		this.baseURL = baseURL;
	}

	async postNotification(target, message) {
		const body = { target, message };

		const serverResponse = await serverEventHandler.addNotification(message, target);

		return serverResponse;
	}

	async getNotifications() {
		const response = await fetch(`${this.baseURL}/notifications`);
		const notifications = await response.json();

		return notifications;
	}
}

export const NotificationsController = new NotificationsHandler(`${PUBLIC_URI}`);
