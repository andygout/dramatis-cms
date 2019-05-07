import { getIn, setIn } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import isObject from '../../lib/is-object';
import objectHasNonEmptyString from '../../lib/object-has-non-empty-string';
import wipeObjectBlank from '../../lib/wipe-object-blank';
import { updateModel } from '../../redux/actions/model';

class Form extends React.Component {

	constructor (props) {

		super(props);

		this.state = props.instance;

		this.handleSubmit = this.handleSubmit.bind(this);

	}

	componentDidUpdate (prevProps) {

		// TODO: Use Lodash isEqual or Immutable.js here.
		if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {

			this.setState(this.props.instance);

		}

	}

	isDeleteButtonReqd (index, arrayLength) {

		return !((index + 1) === arrayLength);

	}

	getNewStateForRootAttr (rootAttr, statePath, eventTargetValue) {

		let newStateForRootAttr = setIn(this.state[rootAttr], statePath, eventTargetValue);

		const indexOfLastNumberInStatePath =
			statePath
				.map(pathItem => typeof pathItem === 'number')
				.lastIndexOf(true);

		const statePathToInnermostArray = statePath.slice(0, indexOfLastNumberInStatePath);

		const innermostArray = getIn(newStateForRootAttr, statePathToInnermostArray);

		// If changed input was in an array.
		if (Array.isArray(innermostArray)) {

			const lastArrayItem = innermostArray[innermostArray.length - 1];

			const blankArrayItemAppendageRequired = objectHasNonEmptyString(lastArrayItem);

			if (blankArrayItemAppendageRequired) {

				const lastArrayItemCopy = Object.assign({}, lastArrayItem);

				const blankArrayItem = wipeObjectBlank(lastArrayItemCopy);

				newStateForRootAttr =
					setIn(
						newStateForRootAttr,
						statePathToInnermostArray,
						[...innermostArray, blankArrayItem]
					);

			}

		}

		return newStateForRootAttr;

	}

	handleChange (statePath, event) {

		const rootAttr = statePath.shift();

		this.setState({
			// TODO: Set state of most specific value rather than entire rootAttr value (as done here).
			// See: npm immutability-helper `update()`.
			[rootAttr]: this.getNewStateForRootAttr(rootAttr, statePath, event.target.value)
		});

	}

	handleRemovalClick (statePath, event) {

		event.preventDefault();

		// TODO: Use Immutable `deleteIn()` once state is immutable, e.g.:
		// this.setState({ [rootAttr]: this.state[rootAttr].deleteIn(statePath) });

	}

	handleSubmit (event) {

		event.preventDefault();

		this.props.updateModel(this.state);

	}

	render () {

		const concealedKeys = ['model', 'uuid'];

		const handleValue = (value, statePath) =>
			isObject(value)
				? renderAsForm(value, statePath)
				: Array.isArray(value)
					? value.map((item, index) =>
							renderAsForm(item, [...statePath, index], this.isDeleteButtonReqd(index, value.length)))
					: (
						<input
							value={value || ''}
							className="field__input"
							maxLength="1000"
							type="text"
							onChange={this.handleChange.bind(this, statePath)}
						/>
					)

		const renderAsForm = (object, statePath = [], isDeleteButtonReqd = false) => {

			const topLevelAttr = statePath.length === 0;

			const ContainerTag = topLevelAttr ? 'fieldset' : 'div';

			const containerClasses = [];
			containerClasses.push(topLevelAttr ? 'fieldset' : 'field');

			const applyNestedClass = statePath.filter(item => isNaN(item)).length > 1;
			if (applyNestedClass) containerClasses.push('field--nested');

			const containerClass = containerClasses.join(' ');

			const TextTag = topLevelAttr ? 'h2' : 'label';

			const textClass = topLevelAttr ? 'fieldset__header' : 'field__label';

			return (
				<div key={statePath.join('-')}>
					{
						isDeleteButtonReqd
							? (
								<div className="removal-button-container">
									<a
										href="#"
										className="removal-button"
										onClick={this.handleRemovalClick.bind(this, statePath)}
									>X</a>
								</div>
							)
							: null
					}
					{
						Object.keys(object)
							.filter(key => !concealedKeys.includes(key))
							.map((key, index) =>
								<ContainerTag className={containerClass} key={`${statePath.join('-')}-${key}`}>

									<React.Fragment>

										<TextTag className={textClass}>{key}:</TextTag>

										{ handleValue(object[key], [...statePath, key]) }

									</React.Fragment>

								</ContainerTag>
							)
					}
				</div>
			);

		}

		return (
			<form onSubmit={this.handleSubmit}>

				{ renderAsForm(this.state) }

				<input className="button" type="submit" value="Submit"/>

			</form>
		);

	}

}

Form.propTypes = { instance: PropTypes.object.isRequired };

const mapDispatchToProps = dispatch =>
	bindActionCreators({ updateModel }, dispatch);

export default connect(null, mapDispatchToProps)(Form);
