import { configureStore } from '@reduxjs/toolkit';
import { Router } from 'express';

import getDocumentTitle from '../lib/get-document-title.js';
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

		const documentTitle = getDocumentTitle();

		response.render(
			'react-mount',
			{
				documentTitleHtml: `<title>${documentTitle}</title>`,
				clientData: JSON.stringify(preloadedState),
				reactHtml
			}
		);

	} catch (error) {

		next(error);

	}

});

export default router;
