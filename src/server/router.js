import { Router } from 'express';
import { Helmet } from 'react-helmet';
import { matchPath } from 'react-router-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { thunk as thunkMiddleware } from 'redux-thunk';

import getReactHtml from '../react/react-html.jsx';
import reducers from '../redux/reducers/index.js';
import routes from '../react/routes.js';

const router = new Router();

const store = createStore(
	combineReducers(reducers),
	{},
	applyMiddleware(...[thunkMiddleware])
);

router.get('*', async (request, response, next) => {

	try {

		const { dispatch, getState } = store;

		const fetchDataPromises = [];

		routes.some(route => {

			const match = matchPath(route, request.url);

			if (match && route.fetchData) {
				route.fetchData.forEach(fetchDataFunction =>
					fetchDataPromises.push(fetchDataFunction(dispatch, match))
				);
			}

			return match;

		});

		await Promise.all(fetchDataPromises);

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
