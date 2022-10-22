import createBlankObject from '../../lib/create-blank-object';
import objectHasNonEmptyString from '../../lib/object-has-non-empty-string';
import { getIn, removeIn, setIn, pushIn } from '../../lib/object-interactions';
import { ACTIONS, MODELS } from '../../utils/constants';

const applyRevisionToStateValue = (stateValue, statePath, revision) => {

	const revisionValue = revision.type === 'checkbox' ? revision.checked : revision.value;

	const revisedValue = setIn(stateValue, statePath, revisionValue);

	return revisedValue;

};

const appendBlankArrayItemToStateValue = (stateValue, statePath, opts = {}) => {

	const indexOfLastNumberInStatePath =
		statePath
			.map(pathItem => typeof pathItem === 'number')
			.lastIndexOf(true);

	const statePathToInnermostArray = statePath.slice(0, indexOfLastNumberInStatePath);

	const innermostArray = getIn(stateValue, statePathToInnermostArray);

	// If changed input was in an array.
	if (Array.isArray(innermostArray)) {

		const lastArrayItem = innermostArray.at(-1);

		const blankArrayItemAppendageRequired = opts.isGuaranteedAppendage || objectHasNonEmptyString(lastArrayItem);

		if (blankArrayItemAppendageRequired) {

			const blankArrayItem = createBlankObject(lastArrayItem);

			stateValue = pushIn(stateValue, statePathToInnermostArray, blankArrayItem);

		}

	}

	return stateValue;

};

const handleChange = (stateValue, setStateValue, statePath, event) => {

	const revisedStateValue = applyRevisionToStateValue(stateValue, statePath, event.target);

	const revisedStateValueWithAppendedBlankArrayItem = appendBlankArrayItemToStateValue(revisedStateValue, statePath);

	setStateValue(revisedStateValueWithAppendedBlankArrayItem);

};

const checkIsLastArrayItem = (index, arrayLength) => {

	return ((index + 1) === arrayLength);

};

const handleAppendArrayItemClick = (stateValue, setStateValue, statePath, event) => {

	event.preventDefault();

	const stateValueWithAppendedBlankArrayItem =
		appendBlankArrayItemToStateValue(stateValue, statePath, { isGuaranteedAppendage: true });

	setStateValue(stateValueWithAppendedBlankArrayItem);

};

const handleRemoveArrayItemClick = (stateValue, setStateValue, statePath, event) => {

	event.preventDefault();

	setStateValue(removeIn(stateValue, statePath));

};

const handleChangeToPerson = (stateValue, setStateValue, statePath, entity, event) => {

	const revisedEntity = structuredClone(entity);
	revisedEntity.model = event.target.value;
	delete revisedEntity.members;

	const revision = { value: revisedEntity, type: 'map' };

	setStateValue(applyRevisionToStateValue(stateValue, statePath, revision));

};

const handleChangeToCompany = (stateValue, setStateValue, statePath, entity, event) => {

	const member = { model: MODELS.PERSON, name: '', differentiator: '', errors: {} };
	const members = [member];

	const revisedEntity = structuredClone(entity);
	revisedEntity.model = event.target.value;
	revisedEntity.members = members;

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

export {
	checkIsLastArrayItem,
	handleChange,
	handleAppendArrayItemClick,
	handleRemoveArrayItemClick,
	handleChangeToPerson,
	handleChangeToCompany,
	handleSubmit,
	handleDelete
};
