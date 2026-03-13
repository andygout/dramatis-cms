import fetchFromApi from '../../../lib/fetch-from-api.js';

export default async (request, response, next) => {
	const { path, body } = request;

	const fetchSettings = {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const instance = await fetchFromApi(path, fetchSettings);

		return response.send(instance);
	} catch (error) {
		return next(error);
	}
};
