import { List, Map, getIn, remove, removeIn, set, setIn, updateIn } from 'immutable';

import createBlankMap from '../../lib/create-blank-map';
import mapHasNonEmptyString from '../../lib/map-has-non-empty-string';
import { ACTIONS, MODELS, MODEL_TO_PROP_NAME_MAP } from '../../utils/constants';

const applyRevisionToStateValue = (stateValue, statePath, revision) => {

	const revisionValue = revision.type === 'checkbox' ? revision.checked : revision.value;

	const revisedValue = setIn(stateValue, statePath, revisionValue);

	return revisedValue;

};

const appendBlankListItemToStateValue = (stateValue, statePath, opts = {}) => {

	const indexOfLastNumberInStatePath =
		statePath
			.map(pathItem => typeof pathItem === 'number')
			.lastIndexOf(true);

	const statePathToInnermostList = statePath.slice(0, indexOfLastNumberInStatePath);

	const innermostList = getIn(stateValue, statePathToInnermostList);

	// If changed input was in a List.
	if (List.isList(innermostList)) {

		const lastListItem = innermostList.get(-1);

		const blankListItemAppendageRequired = opts.isGuaranteedAppendage || mapHasNonEmptyString(lastListItem);

		if (blankListItemAppendageRequired) {

			const blankListItem = createBlankMap(lastListItem);

			stateValue = updateIn(stateValue, statePathToInnermostList, list => list.push(blankListItem));

		}

	}

	return stateValue;

};

const handleChange = (stateValue, setStateValue, statePath, event) => {

	const revisedStateValue = applyRevisionToStateValue(stateValue, statePath, event.target);

	const revisedStateValueWithAppendedBlankListItem = appendBlankListItemToStateValue(revisedStateValue, statePath);

	setStateValue(revisedStateValueWithAppendedBlankListItem);

};

const checkIsLastListItem = (index, listSize) => {

	return ((index + 1) === listSize);

};

const handleCreationClick = (stateValue, setStateValue, statePath, event) => {

	event.preventDefault();

	const stateValueWithAppendedBlankListItem =
		appendBlankListItemToStateValue(stateValue, statePath, { isGuaranteedAppendage: true });

	setStateValue(stateValueWithAppendedBlankListItem);

};

const handleRemovalClick = (stateValue, setStateValue, statePath, event) => {

	event.preventDefault();

	setStateValue(removeIn(stateValue, statePath));

};

const handleChangeToPerson = (stateValue, setStateValue, statePath, entity, event) => {

	let revisedEntity = entity;
	revisedEntity = set(revisedEntity, 'model', event.target.value);
	revisedEntity = remove(revisedEntity, 'members');

	const revision = { value: revisedEntity, type: 'map' };

	setStateValue(applyRevisionToStateValue(stateValue, statePath, revision));

};

const handleChangeToCompany = (stateValue, setStateValue, statePath, entity, event) => {

	const member = Map({ model: MODELS.PERSON, name: '', differentiator: '', errors: Map({}) });
	const members = List([member]);

	let revisedEntity = entity;
	revisedEntity = set(revisedEntity, 'model', event.target.value);
	revisedEntity = set(revisedEntity, 'members', members);

	const revision = { value: revisedEntity, type: 'map' };

	setStateValue(applyRevisionToStateValue(stateValue, statePath, revision));

};

const handleSubmit = (event, action, instance, createInstance, updateInstance) => {

	event.preventDefault();

	switch (action) {

		case ACTIONS.CREATE:
			return createInstance(instance);

		case ACTIONS.UPDATE:
			return updateInstance(instance);

	}

};

const handleDelete = (event, instance, deleteInstance) => {

	event.preventDefault();

	deleteInstance(instance);

};

const getRedirectToProps = (redirectPath, model) => {

	return {
		pathname: redirectPath,
		state: {
			redirectPathOriginStateProp: `${MODEL_TO_PROP_NAME_MAP[model]}FormData`
		}
	};

};

export {
	checkIsLastListItem,
	handleChange,
	handleCreationClick,
	handleRemovalClick,
	handleChangeToPerson,
	handleChangeToCompany,
	handleSubmit,
	handleDelete,
	getRedirectToProps
};
