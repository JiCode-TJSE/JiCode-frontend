import axios from 'axios';

const api = axios.create({
	baseURL: ' https://b022-2001-da8-8002-6bd1-9d0a-c4b4-988b-72c3.ngrok-free.app',
	timeout: 100000,
});

export function request(url, method = 'GET', data = {}, headers = {}) {
	return api({
		url,
		method,
		data,
		headers
	}).then(response => response.data)
		.catch(error => { throw error });
}