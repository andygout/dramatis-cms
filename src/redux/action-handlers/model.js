import getDifferentiatorSuffix from '../../lib/get-differentiator-suffix.js';
import pruneInstance from '../../lib/prune-instance.js';
import { deactivateNotification } from './notification.js';
import * as actions from '../actions/index.js';
import {
	MODEL_TO_DISPLAY_NAME_MAP,
	MODEL_TO_PROP_NAME_MAP,
	MODEL_TO_ROUTE_MAP,
	NOTIFICATION_STATUSES,
	PLURALISED_MODEL_TO_PROP_NAME_MAP,
	PLURALISED_MODEL_TO_ROUTE_MAP
} from '../../utils/constants.js';

const API_URL_BASE = 'http://localhost:3000';

const performFetch = async (url, settings) => {

	const response = await fetch(url, settings);

	if (response.status !== 200) throw new Error(response.statusText);

	return response.json();

};

const fetchList = pluralisedModel => async dispatch => {

	const apiUrl = `${API_URL_BASE}/${PLURALISED_MODEL_TO_ROUTE_MAP[pluralisedModel]}`;

	try {

		const list = await performFetch(apiUrl, { mode: 'cors' });

		const pluralisedModelPropName = PLURALISED_MODEL_TO_PROP_NAME_MAP[pluralisedModel];

		dispatch(actions[`${pluralisedModelPropName}Fetched`](list));

	} catch ({ message }) {

		dispatch(actions.errorActivated({ message }));

		dispatch(deactivateNotification());

	}

};

const fetchInstanceTemplate = model => async dispatch => {

	const apiUrl = `${API_URL_BASE}/${MODEL_TO_ROUTE_MAP[model]}/new`;

	try {

		const instance = await performFetch(apiUrl, { mode: 'cors' });

		const prunedInstance = pruneInstance(instance);

		const modelPropName = MODEL_TO_PROP_NAME_MAP[model];

		dispatch(actions[`${modelPropName}Fetched`](prunedInstance));

		dispatch(actions[`${modelPropName}NewFormDataFetched`]({ instance }));

	} catch ({ message }) {

		dispatch(actions.errorActivated({ message }));

		dispatch(deactivateNotification());

	}

};

const createInstance = instance => async dispatch => {

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

		const instance = await performFetch(apiUrl, fetchSettings);

		const { model, uuid, name, differentiator, hasErrors } = instance;

		const modelPropName = MODEL_TO_PROP_NAME_MAP[model];

		const modelDisplayName = MODEL_TO_DISPLAY_NAME_MAP[model];

		let notification;

		if (hasErrors) {

			dispatch(actions[`${modelPropName}NewFormDataFetched`]({ instance }));

			notification = {
				text: `This ${modelDisplayName} contains errors`,
				status: NOTIFICATION_STATUSES.failure
			};

			dispatch(actions.notificationActivated(notification));

		} else {

			const prunedInstance = pruneInstance(instance);

			dispatch(actions[`${modelPropName}Created`](prunedInstance));

			notification = {
				text: `${name} (${modelDisplayName})${getDifferentiatorSuffix(differentiator)} has been created`,
				status: NOTIFICATION_STATUSES.success
			};

			dispatch(actions.redirectActivated({ path: `/${MODEL_TO_ROUTE_MAP[model]}/${uuid}`, notification }));

			dispatch(actions[`${modelPropName}EditFormDataFetched`]({ instance }));

		}

	} catch ({ message }) {

		dispatch(actions.errorActivated({ message }));

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

	const apiUrl = `${API_URL_BASE}/${MODEL_TO_ROUTE_MAP[model]}/${uuid}/edit`;

	try {

		const instance = await performFetch(apiUrl, { mode: 'cors' });

		const modelPropName = MODEL_TO_PROP_NAME_MAP[model];

		const prunedInstance = pruneInstance(instance);

		dispatch(actions[`${modelPropName}Fetched`](prunedInstance));

		dispatch(actions[`${modelPropName}EditFormDataFetched`]({ instance }));

	} catch ({ message }) {

		dispatch(actions.errorActivated({ message }));

		dispatch(deactivateNotification());

	}

};

const updateInstance = instance => async dispatch => {

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

		const instance = await performFetch(apiUrl, fetchSettings);

		const { model, name, differentiator, hasErrors } = instance;

		const modelPropName = MODEL_TO_PROP_NAME_MAP[model];

		const modelDisplayName = MODEL_TO_DISPLAY_NAME_MAP[model];

		let notification;

		if (hasErrors) {

			notification = {
				text: `This ${modelDisplayName} contains errors`,
				status: NOTIFICATION_STATUSES.failure
			};

		} else {

			const prunedInstance = pruneInstance(instance);

			dispatch(actions[`${modelPropName}Updated`](prunedInstance));

			notification = {
				text: `${name} (${modelDisplayName})${getDifferentiatorSuffix(differentiator)} has been updated`,
				status: NOTIFICATION_STATUSES.success
			};

		}

		dispatch(actions.notificationActivated(notification));

		dispatch(actions[`${modelPropName}EditFormDataFetched`]({ instance }));

	} catch ({ message }) {

		dispatch(actions.errorActivated({ message }));

		dispatch(deactivateNotification());

	}

};

const deleteInstance = instance => async dispatch => {

	const apiUrl = `${API_URL_BASE}/${MODEL_TO_ROUTE_MAP[instance.model]}/${instance.uuid}`;

	const fetchSettings = {
		mode: 'cors',
		method: 'DELETE'
	};

	try {

		const instance = await performFetch(apiUrl, fetchSettings);

		const { model, name, differentiator, hasErrors } = instance;

		const modelPropName = MODEL_TO_PROP_NAME_MAP[model];

		const modelDisplayName = MODEL_TO_DISPLAY_NAME_MAP[model];

		let notification;

		if (hasErrors) {

			const { associations } = instance.errors;

			notification = {
				text: `This ${modelDisplayName} cannot be deleted because
					it has associations with instances
					of the following models: ${associations.join(', ')}`
				,
				status: NOTIFICATION_STATUSES.failure
			};

			dispatch(actions.notificationActivated(notification));

		} else {

			const prunedInstance = pruneInstance(instance);

			dispatch(actions[`${modelPropName}Deleted`](prunedInstance));

			notification = {
				text: `${name} (${modelDisplayName})${getDifferentiatorSuffix(differentiator)} has been deleted`,
				status: NOTIFICATION_STATUSES.success
			};

			dispatch(actions.redirectActivated({ path: `/${MODEL_TO_ROUTE_MAP[model]}`, notification }));

			dispatch(actions[`${modelPropName}EditFormDataFetched`]({ instance }));

		}

	} catch ({ message }) {

		dispatch(actions.errorActivated({ message }));

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
