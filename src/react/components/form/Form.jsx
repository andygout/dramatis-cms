import { List, is, getIn, Map, remove, removeIn, set, setIn, updateIn } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

import createBlankMap from '../../../lib/create-blank-map';
import mapHasNonEmptyString from '../../../lib/map-has-non-empty-string';
import { ACTIONS, MODELS, MODEL_TO_PROP_NAME_MAP } from '../../../utils/constants';

class Form extends React.Component {

	constructor (props) {

		super(props);

		this.state = this.createObjectWithImmutableContent(props.instance);

		this.handleChange = this.handleChange.bind(this);
		this.handleRemovalClick = this.handleRemovalClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);

	}

	componentDidUpdate (prevProps) {

		if (!is(prevProps.instance, this.props.instance)) {

			this.setState({ uuid: undefined, ...this.createObjectWithImmutableContent(this.props.instance) });

		}

	}

	createObjectWithImmutableContent (immutableMap) {

		const object = {};

		immutableMap.entrySeq().forEach(([key, value]) => object[key] = value);

		return object;

	}

	isLastListItem (index, listSize) {

		return ((index + 1) === listSize);

	}

	applyRevisionToRootAttrState (rootAttrState, statePath, revision) {

		const revisionValue = revision.type === 'checkbox' ? revision.checked : revision.value;

		const revisedRootAttrState = setIn(rootAttrState, statePath, revisionValue);

		return revisedRootAttrState;

	}

	appendBlankListItemToRootAttrState (rootAttrState, statePath, opts = {}) {

		const indexOfLastNumberInStatePath =
			statePath
				.map(pathItem => typeof pathItem === 'number')
				.lastIndexOf(true);

		const statePathToInnermostList = statePath.slice(0, indexOfLastNumberInStatePath);

		const innermostList = getIn(rootAttrState, statePathToInnermostList);

		// If changed input was in a List.
		if (List.isList(innermostList)) {

			const lastListItem = innermostList.get(-1);

			const blankListItemAppendageRequired = opts.isGuaranteedAppendage || mapHasNonEmptyString(lastListItem);

			if (blankListItemAppendageRequired) {

				const blankListItem = createBlankMap(lastListItem);

				rootAttrState =
					updateIn(rootAttrState, statePathToInnermostList, list => list.push(blankListItem));

			}

		}

		return rootAttrState;

	}

	handleChange (statePath, event) {

		const rootAttr = statePath.shift();

		const revisedRootAttrState =
			this.applyRevisionToRootAttrState(this.state[rootAttr], statePath, event.target);

		const revisedRootAttrStateWithAppendedBlankListItem =
			this.appendBlankListItemToRootAttrState(revisedRootAttrState, statePath);

		this.setState({ [rootAttr]: revisedRootAttrStateWithAppendedBlankListItem });

	}

	handleCreationClick (statePath, event) {

		event.preventDefault();

		const rootAttr = statePath.shift();

		const rootAttrStateWithAppendedBlankListItem =
			this.appendBlankListItemToRootAttrState(this.state[rootAttr], statePath, { isGuaranteedAppendage: true });

		this.setState({ [rootAttr]: rootAttrStateWithAppendedBlankListItem });

	}

	handleRemovalClick (statePath, event) {

		event.preventDefault();

		const rootAttr = statePath.shift();

		this.setState({ [rootAttr]: removeIn(this.state[rootAttr], statePath) });

	}

	handleChangeToPerson (statePath, entity, property, event) {

		let revisedEntity = entity;
		revisedEntity = set(revisedEntity, 'model', event.target.value);
		revisedEntity = remove(revisedEntity, property);

		const revision = { value: revisedEntity, type: 'map' };

		const rootAttr = statePath.shift();

		this.setState({ [rootAttr]: this.applyRevisionToRootAttrState(this.state[rootAttr], statePath, revision) });

	}

	handleChangeToCompany (statePath, entity, property, event) {

		const member = Map({ model: MODELS.PERSON, name: '', differentiator: '', errors: Map({}) });
		const members = List([member]);

		let revisedEntity = entity;
		revisedEntity = set(revisedEntity, 'model', event.target.value);
		revisedEntity = set(revisedEntity, property, members);

		const revision = { value: revisedEntity, type: 'map' };

		const rootAttr = statePath.shift();

		this.setState({ [rootAttr]: this.applyRevisionToRootAttrState(this.state[rootAttr], statePath, revision) });

	}

	handleSubmit (event) {

		event.preventDefault();

		switch (this.props.action) {

			case ACTIONS.CREATE:
				return this.props.createInstance(this.state);

			case ACTIONS.UPDATE:
				return this.props.updateInstance(this.state);

		}

	}

	handleDelete (event) {

		event.preventDefault();

		this.props.deleteInstance(this.state);

	}

	performRedirect () {

		const redirectToProps = {
			pathname: this.props.redirectPath,
			state: {
				redirectPathOriginStateProp: `${MODEL_TO_PROP_NAME_MAP[this.state.model]}FormData`
			}
		};

		return (
			<Redirect to={redirectToProps} />
		);

	}

}

Form.propTypes = {
	instance: PropTypes.instanceOf(Map).isRequired,
	action: PropTypes.string.isRequired,
	redirectPath: PropTypes.string.isRequired,
	createInstance: PropTypes.func.isRequired,
	updateInstance: PropTypes.func.isRequired,
	deleteInstance: PropTypes.func.isRequired
};

export default Form;
