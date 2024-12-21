import { configureStore } from '@reduxjs/toolkit';
import { Router } from 'express';
import { Helmet } from 'react-helmet';
import { matchPath } from 'react-router-dom';

import getReactHtml from '../react/react-html.jsx';
import reducers from '../redux/reducers/index.js';
import routes from '../react/routes.js';

const router = new Router();

const store = configureStore({
	reducer: reducers,
	middleware: getDefaultMiddleware => getDefaultMiddleware()
});

router.get('*', async (request, response, next) => {

	try {

		const { dispatch, getState } = store;

		let fetchDataPromise;

		routes.some(route => {

			const match = matchPath(route, request.url);

			if (match && route.fetchData) {

				fetchDataPromise = route.fetchData(dispatch, match);

			}

			return match;

		});

		await fetchDataPromise;

		const preloadedState = getState();

		const reactHtml = getReactHtml(request, store);

		const head = Helmet.rewind();

		response.render(
			'react-mount',
			{
				headTitleHtml: head.title.toString(),
				clientData: JSON.stringify(preloadedState),
				reactHtml
			}
		);

	} catch (error) {

		next(error);

	}

});

export default router;
