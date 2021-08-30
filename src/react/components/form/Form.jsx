import { List, is, getIn, removeIn, setIn, updateIn } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Redirect } from 'react-router-dom';

import createBlankMap from '../../../lib/create-blank-map';
import mapHasNonEmptyString from '../../../lib/map-has-non-empty-string';
import { FORM_ACTIONS, MODEL_TO_PROP_NAME_MAP } from '../../../utils/constants';

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

	isRemovalButtonRequired (index, listSize) {

		return !((index + 1) === listSize);

	}

	getNewStateForRootAttr (rootAttr, statePath, revision) {

		const revisionValue = revision.type === 'checkbox' ? revision.checked : revision.value;

		let newStateForRootAttr = setIn(this.state[rootAttr], statePath, revisionValue);

		if (revision.type !== 'text') return newStateForRootAttr;

		const indexOfLastNumberInStatePath =
			statePath
				.map(pathItem => typeof pathItem === 'number')
				.lastIndexOf(true);

		const statePathToInnermostList = statePath.slice(0, indexOfLastNumberInStatePath);

		const innermostList = getIn(newStateForRootAttr, statePathToInnermostList);

		// If changed input was in a List.
		if (List.isList(innermostList)) {

			const lastListItem = innermostList.get(-1);

			const blankListItemAppendageRequired = mapHasNonEmptyString(lastListItem);

			if (blankListItemAppendageRequired) {

				const blankListItem = createBlankMap(lastListItem);

				newStateForRootAttr =
					updateIn(newStateForRootAttr, statePathToInnermostList, list => list.push(blankListItem));

			}

		}

		return newStateForRootAttr;

	}

	handleChange (statePath, event) {

		const rootAttr = statePath.shift();

		this.setState({ [rootAttr]: this.getNewStateForRootAttr(rootAttr, statePath, event.target) });

	}

	handleRemovalClick (statePath, event) {

		event.preventDefault();

		const rootAttr = statePath.shift();

		this.setState({ [rootAttr]: removeIn(this.state[rootAttr], statePath) });

	}

	handleSubmit (event) {

		event.preventDefault();

		switch (this.props.action) {

			case FORM_ACTIONS.create:
				return this.props.createInstance(this.state);

			case FORM_ACTIONS.update:
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
	instance: ImmutablePropTypes.map.isRequired,
	action: PropTypes.string.isRequired,
	redirectPath: PropTypes.string.isRequired,
	createInstance: PropTypes.func.isRequired,
	updateInstance: PropTypes.func.isRequired,
	deleteInstance: PropTypes.func.isRequired
};

export default Form;
