import { configureStore } from '@reduxjs/toolkit';
import { Router } from 'express';
import { Helmet } from 'react-helmet';

import getReactHtml from '../react/react-html.jsx';
import reducers from '../redux/reducers/index.js';
import { api } from '../redux/slices/api.js';

const router = new Router();

const store = configureStore({
	reducer: reducers,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
});

router.get('*', async (request, response, next) => {

	try {

		const { getState } = store;

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
