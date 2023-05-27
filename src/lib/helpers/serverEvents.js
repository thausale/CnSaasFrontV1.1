import axios from 'axios';

class ServerEvents {
	constructor() {}

	async addNotification() {
		try {
			const response = await axios.post('http://localhost:3000/increment-notification');
			console.log('Notification sent successfully', response);
		} catch (error) {
			console.error('Error sending notification:', error);
		}
	}
}

export const serverEventHandler = new ServerEvents();
