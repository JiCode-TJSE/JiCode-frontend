import axios from 'axios';

const api = axios.create({
	baseURL: 'http://127.0.0.1:4523/m1/3754258-0-default',//'http://47.115.224.108:2685',//http://127.0.0.1:4523/m1/3082556-0-default
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
