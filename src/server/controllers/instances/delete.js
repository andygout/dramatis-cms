import fetchFromApi from '../../../lib/fetch-from-api.js';

export default async (request, response, next) => {
	const { path } = request;

	const fetchSettings = {
		method: 'DELETE'
	};

	try {
		const instance = await fetchFromApi(path, fetchSettings);

		return response.send(instance);
	} catch (error) {
		return next(error);
	}
};
