import createAction from './base';
import { setError } from './error';
import * as actions from '../utils/model-actions';
import { irregularPluralNouns } from '../utils/constants';

const URL_BASE = 'http://localhost:3000';

const getPluralisedModel = model => irregularPluralNouns[model] || model + 's';

const request = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}`]);

const receive = (instance, model) =>
	createAction(actions[`RECEIVE_${model.toUpperCase()}`], instance);

const requestUpdate = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}_UPDATE`]);

const receiveUpdate = instance =>
	createAction(actions[`RECEIVE_${instance.model.toUpperCase()}_UPDATE`], instance);

export const fetchModel = (model, uuid = null) => async dispatch => {

	const instance = uuid
		? true
		: false;

	dispatch(request(model));

	let url = `${URL_BASE}/`;

	url += instance
		? getPluralisedModel(model)
		: model;

	if (instance) url += `/${uuid}/edit`;

	try {

		const response = await fetch(url, { mode: 'cors' });

		if (response.status !== 200) throw new Error(response.statusText);

		const instance = await response.json();

		dispatch(receive(instance, model))

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

export const updateModel = instance => async dispatch => {

	dispatch(requestUpdate(instance.model));

	const url = `${URL_BASE}/${getPluralisedModel(instance.model)}/${instance.uuid}`;

	const initObject = {
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors',
		method: 'POST',
		body: JSON.stringify(instance)
	};

	try {

		const response = await fetch(url, initObject);

		if (response.status !== 200) throw new Error(response.statusText);

		const instance = await response.json();

		dispatch(receiveUpdate(instance));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}
