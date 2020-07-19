import nodeFetch from 'node-fetch';

import createAction from './base';
import { setError } from './error';
import { activateNotification } from './notification';
import * as actions from '../utils/model-actions';
import { pluralise } from '../../lib/strings';
import { NOTIFICATION_STATUSES } from '../../utils/constants';

const URL_BASE = 'http://localhost:3000';

const requestList = pluralisedModel =>
	createAction(actions[`REQUEST_${pluralisedModel.toUpperCase()}`]);

const receiveList = (list, pluralisedModel) =>
	createAction(actions[`RECEIVE_${pluralisedModel.toUpperCase()}`], list);

const requestInstance = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}`]);

const receiveInstance = instance =>
	createAction(actions[`RECEIVE_${instance.model.toUpperCase()}`], instance);

const receiveNewFormData = formData =>
	createAction(actions[`RECEIVE_${formData.instance.model.toUpperCase()}_NEW_FORM_DATA`], formData);

const receiveEditFormData = formData =>
	createAction(actions[`RECEIVE_${formData.instance.model.toUpperCase()}_EDIT_FORM_DATA`], formData);

const requestCreate = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}_CREATE`]);

const receiveCreate = instance =>
	createAction(actions[`RECEIVE_${instance.model.toUpperCase()}_CREATE`], instance);

const requestUpdate = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}_UPDATE`]);

const receiveUpdate = instance =>
	createAction(actions[`RECEIVE_${instance.model.toUpperCase()}_UPDATE`], instance);

const requestDelete = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}_DELETE`]);

const receiveDelete = instance =>
	createAction(actions[`RECEIVE_${instance.model.toUpperCase()}_DELETE`], instance);

const performFetch = async (url, settings) => {

	const fetch = global.fetch || nodeFetch;

	const response = await fetch(url, settings);

	if (response.status !== 200) throw new Error(response.statusText);

	return response.json();

}

const fetchList = pluralisedModel => async dispatch => {

	dispatch(requestList(pluralisedModel));

	const url = `${URL_BASE}/${pluralisedModel}`;

	try {

		const fetchedList = await performFetch(url, { mode: 'cors' });

		dispatch(receiveList(fetchedList, pluralisedModel));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const fetchInstanceTemplate = model => async dispatch => {

	dispatch(requestInstance(model));

	const url = `${URL_BASE}/${pluralise(model)}/new`;

	try {

		const fetchedInstance = await performFetch(url, { mode: 'cors' });

		dispatch(receiveInstance(fetchedInstance));

		dispatch(receiveNewFormData({ instance: fetchedInstance }));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const createInstance = instance => async dispatch => {

	const { model } = instance;

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

		let notification;

		if (fetchedInstance.hasErrors) {

			dispatch(receiveNewFormData({ instance: fetchedInstance }));

			notification = {
				text: `This ${fetchedInstance.model} contains errors`,
				status: NOTIFICATION_STATUSES.failure,
				isActive: true
			};

		} else {

			dispatch(receiveCreate(fetchedInstance));

			const redirectPath = `/${pluralise(fetchedInstance.model)}/${fetchedInstance.uuid}`;

			dispatch(receiveEditFormData({ instance: fetchedInstance, redirectPath }));

			notification = {
				text: `${fetchedInstance.name} (${fetchedInstance.model}) has been created`,
				status: NOTIFICATION_STATUSES.success,
				isActive: true
			};

		}

		dispatch(activateNotification(notification));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const fetchInstance = (model, uuid = null) => async dispatch => {

	// To prevent re-fetching the resource if it already exists in state,
	// add `getState` to this function's args:
	// `const fetchInstance = (model, uuid = null) => async (dispatch, getState) => {`
	// and wrap the remaining code of this function in a conditional based on `apiCallRequired`:
	// `const apiCallRequired = isInstance ? getState().getIn([model, 'uuid']) !== uuid : !getState().get(model).size;`
	// This is not applied here because it is necessary for a CMS to display the most current data from source.

	dispatch(requestInstance(model));

	const url = `${URL_BASE}/${pluralise(model)}/${uuid}/edit`;

	try {

		const fetchedInstance = await performFetch(url, { mode: 'cors' });

		dispatch(receiveInstance(fetchedInstance));

		dispatch(receiveEditFormData({ instance: fetchedInstance }));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const updateInstance = instance => async dispatch => {

	const { model, uuid } = instance;

	dispatch(requestUpdate(model));

	const url = `${URL_BASE}/${pluralise(model)}/${uuid}`;

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

		let notification;

		if (fetchedInstance.hasErrors) {

			notification = {
				text: `This ${fetchedInstance.model} contains errors`,
				status: NOTIFICATION_STATUSES.failure,
				isActive: true
			};

		} else {

			dispatch(receiveUpdate(fetchedInstance));

			notification = {
				text: `${fetchedInstance.name} (${fetchedInstance.model}) has been updated`,
				status: NOTIFICATION_STATUSES.success,
				isActive: true
			};

		}

		dispatch(activateNotification(notification));

		dispatch(receiveEditFormData({ instance: fetchedInstance }));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const deleteInstance = instance => async dispatch => {

	const { model, uuid } = instance;

	dispatch(requestDelete(model));

	const url = `${URL_BASE}/${pluralise(model)}/${uuid}`;

	const fetchSettings = {
		mode: 'cors',
		method: 'DELETE'
	};

	try {

		const fetchedInstance = await performFetch(url, fetchSettings);

		let notification;

		if (fetchedInstance.hasErrors) {

			const { dependentAssociations } = fetchedInstance.errors;

			notification = {
				text: `This ${fetchedInstance.model} cannot be deleted because
					it has dependent associations with instances
					of the following models: ${dependentAssociations.join(', ')}`
				,
				status: NOTIFICATION_STATUSES.failure,
				isActive: true
			};

		} else {

			dispatch(receiveDelete(fetchedInstance));

			const redirectPath = `/${pluralise(fetchedInstance.model)}`;

			dispatch(receiveEditFormData({ instance: fetchedInstance, redirectPath }));

			notification = {
				text: `${fetchedInstance.name} (${fetchedInstance.model}) has been deleted`,
				status: NOTIFICATION_STATUSES.success,
				isActive: true
			};

		}

		dispatch(activateNotification(notification));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}

const removeRedirectPath = redirectPathOriginStateProp => async (dispatch, getState) => {

	const { instance } = getState().get(redirectPathOriginStateProp).toJS();

	dispatch(receiveEditFormData({ instance }));

}

export {
	fetchList,
	fetchInstanceTemplate,
	fetchInstance,
	createInstance,
	updateInstance,
	deleteInstance,
	removeRedirectPath
}
