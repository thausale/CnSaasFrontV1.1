import axios from 'axios';
import { serverAddress } from '$lib/config.js';

class ServerEvents {
	constructor() {}

	async addNotification(message, target) {
		try {
			const response = await axios.post(`${serverAddress}/notification`, { message, target });
			return response;
			console.log('Notification sent successfully');
		} catch (error) {
			console.error('Error sending notification:', error);
		}
	}
}

export const serverEventHandler = new ServerEvents();
