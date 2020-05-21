import createAction from './base';
import { setError } from './error';
import * as actions from '../utils/model-actions';
import getPluralisedModel from '../../lib/get-pluralised-model';

const URL_BASE = 'http://localhost:3000';

const request = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}`]);

const receive = (instance, model) =>
	createAction(actions[`RECEIVE_${model.toUpperCase()}`], instance);

const requestTemplate = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}_TEMPLATE`]);

const receiveTemplate = (instanceTemplate, model) =>
	createAction(actions[`RECEIVE_${model.toUpperCase()}_TEMPLATE`], instanceTemplate);

const receiveNewFormData = instance =>
	createAction(actions['RECEIVE_NEW_FORM_DATA'], instance);

const receiveEditFormData = instance =>
	createAction(actions['RECEIVE_EDIT_FORM_DATA'], instance);

const requestCreate = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}_CREATE`]);

const receiveCreate = instance =>
	createAction(actions[`RECEIVE_${instance.model.toUpperCase()}_CREATE`], instance);

const requestUpdate = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}_UPDATE`]);

const receiveUpdate = instance =>
	createAction(actions[`RECEIVE_${instance.model.toUpperCase()}_UPDATE`], instance);

const fetchList = model => async dispatch => {

	dispatch(request(model));

	const url = `${URL_BASE}/${model}`;

	try {

		const response = await fetch(url, { mode: 'cors' });

		if (response.status !== 200) throw new Error(response.statusText);

		const list = await response.json();

		dispatch(receive(list, model));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const fetchInstanceTemplate = model => async dispatch => {

	dispatch(requestTemplate(model));

	const url = `${URL_BASE}/${getPluralisedModel(model)}/new`;

	try {

		const response = await fetch(url, { mode: 'cors' });

		if (response.status !== 200) throw new Error(response.statusText);

		const instance = await response.json();

		dispatch(receiveTemplate(instance, model));

		dispatch(receiveNewFormData({ ...instance, redirectToInstance: false }));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const createInstance = instance => async dispatch => {

	dispatch(requestCreate(instance.model));

	const url = `${URL_BASE}/${getPluralisedModel(instance.model)}`;

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

		if (instance.hasErrors) {

			dispatch(receiveNewFormData({ ...instance, redirectToInstance: false }));

		} else {

			dispatch(receiveCreate(instance));

			dispatch(receiveEditFormData({ ...instance, redirectToInstance: true }));

		}

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const fetchInstance = (model, uuid = null) => async dispatch => {

	// To prevent re-fetching the resource if it already exists in state,
	// add `getState` to this function's args:
	// `const fetchModel = (model, uuid = null) => async (dispatch, getState) => {`
	// and wrap the remaining code of this function in a conditional based on `apiCallRequired`:
	// `const apiCallRequired = isInstance ? getState().getIn([model, 'uuid']) !== uuid : !getState().get(model).size;`
	// This is not applied here because it is necessary for a CMS to display the most current data from source.

	dispatch(request(model));

	const url = `${URL_BASE}/${getPluralisedModel(model)}/${uuid}/edit`;

	try {

		const response = await fetch(url, { mode: 'cors' });

		if (response.status !== 200) throw new Error(response.statusText);

		const instance = await response.json();

		dispatch(receive(instance, model));

		dispatch(receiveEditFormData({ ...instance, redirectToInstance: false }));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const updateInstance = instance => async dispatch => {

	dispatch(requestUpdate(instance.model));

	const url = `${URL_BASE}/${getPluralisedModel(instance.model)}/${instance.uuid}`;

	const initObject = {
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors',
		method: 'PUT',
		body: JSON.stringify(instance)
	};

	try {

		const response = await fetch(url, initObject);

		if (response.status !== 200) throw new Error(response.statusText);

		const instance = await response.json();

		if (!instance.hasErrors) dispatch(receiveUpdate(instance));

		dispatch(receiveEditFormData({ ...instance, redirectToInstance: false }));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

export {
	fetchList,
	fetchInstanceTemplate,
	fetchInstance,
	createInstance,
	updateInstance
}
