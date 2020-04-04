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

const receiveFormData = instance =>
	createAction(actions['RECEIVE_FORM_DATA'], instance);

const requestUpdate = model =>
	createAction(actions[`REQUEST_${model.toUpperCase()}_UPDATE`]);

const receiveUpdate = instance =>
	createAction(actions[`RECEIVE_${instance.model.toUpperCase()}_UPDATE`], instance);

export const fetchModel = (model, uuid = null) => async dispatch => {

	const isInstance = uuid
		? true
		: false;

	// To prevent re-fetching the resource if it already exists in state,
	// add `getState` to this function's args:
	// `export const fetchModel = (model, uuid = null) => async (dispatch, getState) => {`
	// and wrap the remaining code of this function in a conditional based on `apiCallRequired`:
	// `const apiCallRequired = isInstance ? getState().getIn([model, 'uuid']) !== uuid : !getState().get(model).size;`
	// This is not applied here because it is necessary for a CMS to display the most current data from source.

	dispatch(request(model));

	let url = URL_BASE;

	url += isInstance
		? `/${getPluralisedModel(model)}`
		: `/${model}`;

	if (isInstance) url += `/${uuid}/edit`;

	try {

		const response = await fetch(url, { mode: 'cors' });

		if (response.status !== 200) throw new Error(response.statusText);

		const instance = await response.json();

		dispatch(receive(instance, model));

		if (isInstance) dispatch(receiveFormData(instance));

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

		if (!instance.hasErrors) dispatch(receiveUpdate(instance));

		dispatch(receiveFormData(instance));

	} catch ({ message }) {

		dispatch(setError({ exists: true, message }));

	}

}
