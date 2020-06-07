import createAction from './base';
import { setError } from './error';
import * as actions from '../utils/model-actions';
import { pluralise } from '../../lib/strings';

const URL_BASE = 'http://localhost:3000';

const request = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}`]);

const receive = (fetchedData, model) =>
	createAction(actions[`RECEIVE_${model.toUpperCase()}`], fetchedData);

const requestTemplate = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}_TEMPLATE`]);

const receiveTemplate = (instanceTemplate, model) =>
	createAction(actions[`RECEIVE_${model.toUpperCase()}_TEMPLATE`], instanceTemplate);

const receiveNewFormData = (formData, model) =>
	createAction(actions[`RECEIVE_${model.toUpperCase()}_NEW_FORM_DATA`], formData);

const receiveEditFormData = (formData, model) =>
	createAction(actions[`RECEIVE_${model.toUpperCase()}_EDIT_FORM_DATA`], formData);

const requestCreate = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}_CREATE`]);

const receiveCreate = instance =>
	createAction(actions[`RECEIVE_${instance.model.toUpperCase()}_CREATE`], instance);

const requestUpdate = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}_UPDATE`]);

const receiveUpdate = instance =>
	createAction(actions[`RECEIVE_${instance.model.toUpperCase()}_UPDATE`], instance);

const performFetch = async (url, settings) => {

	const response = await fetch(url, settings);

	if (response.status !== 200) throw new Error(response.statusText);

	return response.json();

}

const fetchList = model => async dispatch => {

	dispatch(request(model));

	const url = `${URL_BASE}/${model}`;

	try {

		const fetchedList = await performFetch(url, { mode: 'cors' });

		dispatch(receive(fetchedList, model));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const fetchInstanceTemplate = model => async dispatch => {

	dispatch(requestTemplate(model));

	const url = `${URL_BASE}/${pluralise(model)}/new`;

	try {

		const fetchedInstance = await performFetch(url, { mode: 'cors' });

		dispatch(receiveTemplate(fetchedInstance, model));

		dispatch(receiveNewFormData({ instance: fetchedInstance, redirectToInstance: false }, model));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const createInstance = instance => async dispatch => {

	const model = instance.model;

	dispatch(requestCreate(model));

	const url = `${URL_BASE}/${pluralise(model)}`;

	const fetchSettings = {
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors',
		method: 'POST',
		body: JSON.stringify(instance)
	};

	try {

		const fetchedInstance = await performFetch(url, fetchSettings);

		if (fetchedInstance.hasErrors) {

			dispatch(receiveNewFormData({ instance: fetchedInstance, redirectToInstance: false }, model));

		} else {

			dispatch(receiveCreate(fetchedInstance));

			dispatch(receiveEditFormData({ instance: fetchedInstance, redirectToInstance: true }, model));

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

	const url = `${URL_BASE}/${pluralise(model)}/${uuid}/edit`;

	try {

		const fetchedInstance = await performFetch(url, { mode: 'cors' });

		dispatch(receive(fetchedInstance, model));

		dispatch(receiveEditFormData({ instance: fetchedInstance, redirectToInstance: false }, model));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const updateInstance = instance => async dispatch => {

	const model = instance.model;

	dispatch(requestUpdate(model));

	const url = `${URL_BASE}/${pluralise(model)}/${instance.uuid}`;

	const fetchSettings = {
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors',
		method: 'PUT',
		body: JSON.stringify(instance)
	};

	try {

		const fetchedInstance = await performFetch(url, fetchSettings);

		if (!fetchedInstance.hasErrors) dispatch(receiveUpdate(fetchedInstance));

		dispatch(receiveEditFormData({ instance: fetchedInstance, redirectToInstance: false }, model));

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
