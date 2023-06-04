import axios from 'axios';

class ServerEvents {
	constructor() {}

	async addNotification(message, target) {
		try {
			const response = await axios.post('http://localhost:3000/notification', { message, target });
			return response;
			console.log('Notification sent successfully');
		} catch (error) {
			console.error('Error sending notification:', error);
		}
	}
}

export const serverEventHandler = new ServerEvents();
