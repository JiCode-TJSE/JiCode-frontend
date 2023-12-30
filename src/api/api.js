import axios from 'axios';

const api = axios.create({
	baseURL: 'http://127.0.0.1:4523/m1/3754258-0-default',
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