class dataHandler {
	constructor(baseURL) {
		this.baseURL = baseURL;
	}

	async post(batch, name, data, id) {
		const body = { batch, item: name, data, last_edited_by: id, created_by: id };
		console.log(body);
		const response = await fetch(`${this.baseURL}`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	}

	async getData() {
		const response = await fetch(`${this.baseURL}`);
		const data = await response.json();

		return data;
	}
}

export const DataApi = new dataHandler('http://localhost/api/data');
