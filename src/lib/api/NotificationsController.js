import { PUBLIC_URI } from '$env/static/public';
import { serverEventHandler } from '$lib/helpers/serverEvents';
import axios from 'axios';

class NotificationsHandler {
	constructor(baseURL) {
		this.baseURL = baseURL;
	}

	async postNotification(target, message) {
		const body = { target, message };
		try {
			return await axios.post(`${PUBLIC_URI}/trigger-event`, { message, target });
		} catch (error) {
			console.error(error);
			//res.status(500).json({ status: 'failed', message: error.message });
		}
	}

	async getNotifications() {
		const response = await fetch(`${this.baseURL}/notifications`);
		const notifications = await response.json();

		return notifications;
	}
}

export const NotificationsController = new NotificationsHandler(`${PUBLIC_URI}`);
