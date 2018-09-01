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

export const fetchModel = (model, uuid = null) => dispatch => {

	const instance = uuid
		? true
		: false;

	dispatch(request(model));

	let url = `${URL_BASE}/`;

	url += instance
		? getPluralisedModel(model)
		: model;

	if (instance) url += `/${uuid}/edit`;

	return fetch(url, { mode: 'cors' })
		.then(response => {

			if (response.status !== 200) throw new Error(response.statusText);

			return response.json();

		})
		.then(instance => dispatch(receive(instance, model)))
		.catch(({ message }) => dispatch(setError({ exists: true, message })));

}

export const updateModel = instance => dispatch => {

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

	return fetch(url, initObject)
		.then(response => {

			if (response.status !== 200) throw new Error(response.statusText);

			return response.json();

		})
		.then(instance => dispatch(receiveUpdate(instance)))
		.catch(({ message }) => dispatch(setError({ exists: true, message })));

}
