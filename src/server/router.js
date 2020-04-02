import express from 'express';
import { fromJS } from 'immutable';
import { Helmet } from 'react-helmet';
import { matchPath } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunkMiddleware from 'redux-thunk';

import getReactHtml from '../react/react-html';
import reducers from '../redux/reducers';
import routes from '../react/routes';

const router = express.Router();

const store = createStore(
	combineReducers(reducers),
	fromJS({}),
	applyMiddleware(...[thunkMiddleware])
);

router.get('*', async function (req, res, next) {

	try {

		const { dispatch, getState } = store;

		const fetchDataPromises = [];

		routes.some(route => {

			const match = matchPath(req.url, route);

			if (match && route.fetchData) route.fetchData.forEach(fn => fetchDataPromises.push(fn(dispatch, match)));

			return match

		});

		await Promise.all(fetchDataPromises);

		const preloadedState = getState();

		const reactHtml = getReactHtml(req, store);

		const head = Helmet.rewind();

		res.render(
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
