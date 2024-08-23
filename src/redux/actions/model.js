import createAction from './base.js';
import { activateError } from './error.js';
import { activateRedirect } from './redirect.js';
import { activateNotification, deactivateNotification } from './notification.js';
import * as actions from '../utils/model-action-names.js';
import getDifferentiatorSuffix from '../../lib/get-differentiator-suffix.js';
import pruneInstance from '../../lib/prune-instance.js';
import {
	MODEL_TO_DISPLAY_NAME_MAP,
	MODEL_TO_ROUTE_MAP,
	NOTIFICATION_STATUSES,
	PLURALISED_MODEL_TO_ROUTE_MAP
} from '../../utils/constants.js';

const API_URL_BASE = 'http://localhost:3000';

const requestList = pluralisedModel =>
	createAction(actions[`REQUEST_${pluralisedModel}`]);

const receiveList = (list, pluralisedModel) =>
	createAction(actions[`RECEIVE_${pluralisedModel}`], list);

const requestInstance = model =>
	createAction(actions[`REQUEST_${model}`]);

const receiveInstance = instance =>
	createAction(actions[`RECEIVE_${instance.model}`], instance);

const receiveNewFormData = formData =>
	createAction(actions[`RECEIVE_${formData.instance.model}_NEW_FORM_DATA`], formData);

const receiveEditFormData = formData =>
	createAction(actions[`RECEIVE_${formData.instance.model}_EDIT_FORM_DATA`], formData);

const requestCreate = model =>
	createAction(actions[`REQUEST_${model}_CREATE`]);

const receiveCreate = instance =>
	createAction(actions[`RECEIVE_${instance.model}_CREATE`], instance);

const requestUpdate = model =>
	createAction(actions[`REQUEST_${model}_UPDATE`]);

const receiveUpdate = instance =>
	createAction(actions[`RECEIVE_${instance.model}_UPDATE`], instance);

const requestDelete = model =>
	createAction(actions[`REQUEST_${model}_DELETE`]);

const receiveDelete = instance =>
	createAction(actions[`RECEIVE_${instance.model}_DELETE`], instance);

const performFetch = async (url, settings) => {

	const response = await fetch(url, settings);

	if (response.status !== 200) throw new Error(response.statusText);

	return response.json();

};

const fetchList = pluralisedModel => async dispatch => {

	dispatch(requestList(pluralisedModel));

	const apiUrl = `${API_URL_BASE}/${PLURALISED_MODEL_TO_ROUTE_MAP[pluralisedModel]}`;

	try {

		const fetchedList = await performFetch(apiUrl, { mode: 'cors' });

		dispatch(receiveList(fetchedList, pluralisedModel));

	} catch ({ message }) {

		dispatch(activateError({ message }));

		dispatch(deactivateNotification());

	}

};

const fetchInstanceTemplate = model => async dispatch => {

	dispatch(requestInstance(model));

	const apiUrl = `${API_URL_BASE}/${MODEL_TO_ROUTE_MAP[model]}/new`;

	try {

		const fetchedInstance = await performFetch(apiUrl, { mode: 'cors' });

		const prunedInstance = pruneInstance(fetchedInstance);

		dispatch(receiveInstance(prunedInstance));

		dispatch(receiveNewFormData({ instance: fetchedInstance }));

	} catch ({ message }) {

		dispatch(activateError({ message }));

		dispatch(deactivateNotification());

	}

};

const createInstance = instance => async dispatch => {

	dispatch(requestCreate(instance.model));

	const apiUrl = `${API_URL_BASE}/${MODEL_TO_ROUTE_MAP[instance.model]}`;

	const fetchSettings = {
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors',
		method: 'POST',
		body: JSON.stringify(instance)
	};

	try {

		const fetchedInstance = await performFetch(apiUrl, fetchSettings);

		const { model, uuid, name, differentiator, hasErrors } = fetchedInstance;

		let notification;

		if (hasErrors) {

			dispatch(receiveNewFormData({ instance: fetchedInstance }));

			notification = {
				text: `This ${MODEL_TO_DISPLAY_NAME_MAP[model]} contains errors`,
				status: NOTIFICATION_STATUSES.failure
			};

			dispatch(activateNotification(notification));

		} else {

			const prunedInstance = pruneInstance(fetchedInstance);

			dispatch(receiveCreate(prunedInstance));

			notification = {
				text: `${name} (${MODEL_TO_DISPLAY_NAME_MAP[model]})${getDifferentiatorSuffix(differentiator)} has been created`,
				status: NOTIFICATION_STATUSES.success
			};

			dispatch(activateRedirect({ path: `/${MODEL_TO_ROUTE_MAP[model]}/${uuid}`, notification }));

			dispatch(receiveEditFormData({ instance: fetchedInstance }));

		}

	} catch ({ message }) {

		dispatch(activateError({ message }));

		dispatch(deactivateNotification());

	}

};

const fetchInstance = (model, uuid = null) => async dispatch => {

	// To prevent re-fetching the resource if it already exists in state,
	// add `getState` to this function's args:
	// `const fetchInstance = (model, uuid = null) => async (dispatch, getState) => {`
	// and wrap the remaining code of this function in a conditional based on `apiCallRequired`:
	// `const apiCallRequired = isInstance ? getState()[model].uuid !== uuid : !getState()[model].length;`
	// This is not applied here because it is necessary for a CMS to display the most current data from source.

	dispatch(requestInstance(model));

	const apiUrl = `${API_URL_BASE}/${MODEL_TO_ROUTE_MAP[model]}/${uuid}/edit`;

	try {

		const fetchedInstance = await performFetch(apiUrl, { mode: 'cors' });

		const prunedInstance = pruneInstance(fetchedInstance);

		dispatch(receiveInstance(prunedInstance));

		dispatch(receiveEditFormData({ instance: fetchedInstance }));

	} catch ({ message }) {

		dispatch(activateError({ message }));

		dispatch(deactivateNotification());

	}

};

const updateInstance = instance => async dispatch => {

	dispatch(requestUpdate(instance.model));

	const apiUrl = `${API_URL_BASE}/${MODEL_TO_ROUTE_MAP[instance.model]}/${instance.uuid}`;

	const fetchSettings = {
		headers: {
			'Content-Type': 'application/json'
		},
		mode: 'cors',
		method: 'PUT',
		body: JSON.stringify(instance)
	};

	try {

		const fetchedInstance = await performFetch(apiUrl, fetchSettings);

		const { model, name, differentiator, hasErrors } = fetchedInstance;

		let notification;

		if (hasErrors) {

			notification = {
				text: `This ${MODEL_TO_DISPLAY_NAME_MAP[model]} contains errors`,
				status: NOTIFICATION_STATUSES.failure
			};

		} else {

			const prunedInstance = pruneInstance(fetchedInstance);

			dispatch(receiveUpdate(prunedInstance));

			notification = {
				text: `${name} (${MODEL_TO_DISPLAY_NAME_MAP[model]})${getDifferentiatorSuffix(differentiator)} has been updated`,
				status: NOTIFICATION_STATUSES.success
			};

		}

		dispatch(activateNotification(notification));

		dispatch(receiveEditFormData({ instance: fetchedInstance }));

	} catch ({ message }) {

		dispatch(activateError({ message }));

		dispatch(deactivateNotification());

	}

};

const deleteInstance = instance => async dispatch => {

	dispatch(requestDelete(instance.model));

	const apiUrl = `${API_URL_BASE}/${MODEL_TO_ROUTE_MAP[instance.model]}/${instance.uuid}`;

	const fetchSettings = {
		mode: 'cors',
		method: 'DELETE'
	};

	try {

		const fetchedInstance = await performFetch(apiUrl, fetchSettings);

		const { model, name, differentiator, hasErrors } = fetchedInstance;

		let notification;

		if (hasErrors) {

			const { associations } = fetchedInstance.errors;

			notification = {
				text: `This ${MODEL_TO_DISPLAY_NAME_MAP[model]} cannot be deleted because
					it has associations with instances
					of the following models: ${associations.join(', ')}`
				,
				status: NOTIFICATION_STATUSES.failure
			};

			dispatch(activateNotification(notification));

		} else {

			const prunedInstance = pruneInstance(fetchedInstance);

			dispatch(receiveDelete(prunedInstance));

			notification = {
				text: `${name} (${MODEL_TO_DISPLAY_NAME_MAP[model]})${getDifferentiatorSuffix(differentiator)} has been deleted`,
				status: NOTIFICATION_STATUSES.success
			};

			dispatch(activateRedirect({ path: `/${MODEL_TO_ROUTE_MAP[model]}`, notification }));

			dispatch(receiveEditFormData({ instance: fetchedInstance }));

		}

	} catch ({ message }) {

		dispatch(activateError({ message }));

		dispatch(deactivateNotification());

	}

};

export {
	fetchList,
	fetchInstanceTemplate,
	fetchInstance,
	createInstance,
	updateInstance,
	deleteInstance
};
