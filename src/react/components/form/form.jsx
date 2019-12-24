import classNames from 'classnames';
import { List, Map, is, getIn, removeIn, setIn, updateIn } from 'immutable';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import camelCaseToSentenceCase from '../../../lib/camel-case-to-sentence-case';
import createBlankMap from '../../../lib/create-blank-map';
import mapHasNonEmptyString from '../../../lib/map-has-non-empty-string';
import ArrayItem from './array-item';
import Input from './input';
import InputErrors from './input-errors';
import { updateModel } from '../../../redux/actions/model';

class Form extends React.Component {

	constructor (props) {

		super(props);

		this.state = this.createObjectWithImmutableContent(props.formData);

		this.handleSubmit = this.handleSubmit.bind(this);

	}

	componentDidUpdate (prevProps) {

		if (!is(prevProps.formData, this.props.formData)) {

			this.setState(this.createObjectWithImmutableContent(this.props.formData));

		}

	}

	createObjectWithImmutableContent (immutableMap) {

		const object = {};

		immutableMap.entrySeq().forEach(([key, value]) => object[key] = value);

		return object;

	}

	isRemovalButtonReqd (index, listSize) {

		return !((index + 1) === listSize);

	}

	getNewStateForRootAttr (rootAttr, statePath, eventTargetValue) {

		let newStateForRootAttr = setIn(this.state[rootAttr], statePath, eventTargetValue);

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

		this.setState({ [rootAttr]: this.getNewStateForRootAttr(rootAttr, statePath, event.target.value) });

	}

	handleRemovalClick (statePath, event) {

		event.preventDefault();

		const rootAttr = statePath.shift();

		this.setState({ [rootAttr]: removeIn(this.state[rootAttr], statePath) });

	}

	handleSubmit (event) {

		event.preventDefault();

		this.props.updateModel(this.state);

	}

	render () {

		const concealedKeys = ['model', 'uuid', 'errors', 'hasErrors'];

		const handleValue = (value, statePath, errors) =>
			Map.isMap(value)
				? renderAsForm(value, statePath)
				: List.isList(value)
					? value.map((item, index) =>
						renderAsForm(item, [...statePath, index], this.isRemovalButtonReqd(index, value.size))
					)
					: (
						<React.Fragment>
							<Input
								value={value}
								hasErrors={!!errors}
								handleChange={this.handleChange.bind(this, statePath)}
							/>
							<InputErrors
								errors={errors}
								statePath={statePath}
							/>
						</React.Fragment>
					);

		const renderAsForm = (map, statePath = [], isRemovalButtonReqd = false) => {

			const isArrayItem = statePath.some(item => !isNaN(item));

			const isNestedArrayItem = statePath.filter(item => !isNaN(item)).length > 1;

			const fieldsetModuleClassName = classNames({
				'fieldset__module': isArrayItem,
				'fieldset__module--nested': isNestedArrayItem
			});

			return (
				<div className={fieldsetModuleClassName} key={statePath.join('-')}>

					{
						isArrayItem && (
							<ArrayItem
								isRemovalButtonReqd={isRemovalButtonReqd}
								handleRemovalClick={this.handleRemovalClick.bind(this, statePath)}
							/>
						)
					}

					{
						map.entrySeq()
							.filter(([key]) => !concealedKeys.includes(key))
							.map(([key, value]) =>
								<div
									className={isArrayItem ? 'fieldset__module-component': ''}
									key={`${statePath.join('-')}-${key}`}
								>

									<label className="fieldset__label">{camelCaseToSentenceCase(key)}:</label>

									{
										handleValue(
											value,
											[...statePath, key],
											map.getIn(['errors', key])
										)
									}

								</div>
							)
					}

				</div>
			);

		}

		return (
			<form className="form" onSubmit={this.handleSubmit}>

				{
					Object.keys(this.state)
						.filter(key => !concealedKeys.includes(key))
						.map(key =>
							<fieldset className="fieldset" key={key}>

								<h2 className="fieldset__header">{camelCaseToSentenceCase(key)}:</h2>

								{
									handleValue(
										this.state[key],
										[key],
										this.state.errors && this.state.errors.get(key)
									)
								}

							</fieldset>
						)
				}

				<input className="button" type="submit" value="Submit"/>

			</form>
		);

	}

}

Form.propTypes = { formData: ImmutablePropTypes.map.isRequired };

const mapStateToProps = state => ({ formData: state.get('formData') });

const mapDispatchToProps = dispatch =>
	bindActionCreators({ updateModel }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
