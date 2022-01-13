import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ArrayItemActionButton, Fieldset, FieldsetComponent, Form, FormWrapper, InputAndErrors } from '../form';
import { createInstance, updateInstance, deleteInstance } from '../../../redux/actions/model';
import { CREDIT_TYPES, MODELS } from '../../../utils/constants';

class MaterialForm extends Form {

	renderWritingEntities (entities, entitiesStatePath) {

		return (
			<FieldsetComponent label={'Writing entities (people, companies, materials)'} isArrayItem={true}>

				{
					entities.map((entity, index) => {

						const statePath = entitiesStatePath.concat([index]);

						const isLastListItem = this.isLastListItem(index, entities.size);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? this.handleCreationClick(statePath, event)
											: this.handleRemovalClick(statePath, event)
									}
								/>

								<FieldsetComponent label={'Name'} isArrayItem={true}>

									<InputAndErrors
										value={entity.get('name')}
										errors={entity.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(statePath.concat(['name']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={entity.get('differentiator')}
										errors={entity.getIn(['errors', 'differentiator'])}
										handleChange={event => this.handleChange(statePath.concat(['differentiator']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Model'} isArrayItem={true}>

									<input
										type={'radio'}
										value={MODELS.PERSON}
										checked={entity.get('model') === MODELS.PERSON}
										onChange={event => this.handleChange(statePath.concat(['model']), event)}
									/>
									<label>{' Person'}</label>

									<input
										type={'radio'}
										value={MODELS.COMPANY}
										checked={entity.get('model') === MODELS.COMPANY}
										onChange={event => this.handleChange(statePath.concat(['model']), event)}
									/>
									<label>{' Company'}</label>

									<input
										type={'radio'}
										value={MODELS.MATERIAL}
										checked={entity.get('model') === MODELS.MATERIAL}
										onChange={event => this.handleChange(statePath.concat(['model']), event)}
									/>
									<label>{' Material'}</label>

								</FieldsetComponent>

							</div>
						);

					})
				}

			</FieldsetComponent>
		);

	}

	renderWritingCredits (writingCredits) {

		return (
			<Fieldset header={'Writing credits'}>

				{
					writingCredits.map((writingCredit, index) => {

						const statePath = ['writingCredits', index];

						const isLastListItem = this.isLastListItem(index, writingCredits.size);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? this.handleCreationClick(statePath, event)
											: this.handleRemovalClick(statePath, event)
									}
								/>

								<FieldsetComponent label={'Name'} isArrayItem={true}>

									<InputAndErrors
										value={writingCredit.get('name')}
										errors={writingCredit.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(statePath.concat(['name']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Credit type'} isArrayItem={true}>

									<input
										type={'radio'}
										value={''}
										checked={!writingCredit.get('creditType')}
										onChange={event => this.handleChange(statePath.concat(['creditType']), event)}
									/>
									<label>{' Direct'}</label>

									<input
										type={'radio'}
										value={CREDIT_TYPES.NON_SPECIFIC_SOURCE_MATERIAL}
										checked={writingCredit.get('creditType') === CREDIT_TYPES.NON_SPECIFIC_SOURCE_MATERIAL}
										onChange={event => this.handleChange(statePath.concat(['creditType']), event)}
									/>
									<label>{' Non-specific source material'}</label>

									<input
										type={'radio'}
										value={CREDIT_TYPES.RIGHTS_GRANTOR}
										checked={writingCredit.get('creditType') === CREDIT_TYPES.RIGHTS_GRANTOR}
										onChange={event => this.handleChange(statePath.concat(['creditType']), event)}
									/>
									<label>{' Rights grantor'}</label>

								</FieldsetComponent>

								{ this.renderWritingEntities(writingCredit.get('entities'), statePath.concat(['entities'])) }

							</div>
						);

					})
				}

			</Fieldset>
		);

	}

	renderCharacters (characters, charactersStatePath) {

		return (
			<FieldsetComponent label={'Characters'} isArrayItem={true}>

				{
					characters.map((character, index) => {

						const statePath = charactersStatePath.concat([index]);

						const isLastListItem = this.isLastListItem(index, characters.size);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? this.handleCreationClick(statePath, event)
											: this.handleRemovalClick(statePath, event)
									}
								/>

								<FieldsetComponent label={'Name'} isArrayItem={true}>

									<InputAndErrors
										value={character.get('name')}
										errors={character.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(statePath.concat(['name']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Underlying name'} isArrayItem={true}>

									<InputAndErrors
										value={character.get('underlyingName')}
										errors={character.getIn(['errors', 'underlyingName'])}
										handleChange={event => this.handleChange(statePath.concat(['underlyingName']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={character.get('differentiator')}
										errors={character.getIn(['errors', 'differentiator'])}
										handleChange={event => this.handleChange(statePath.concat(['differentiator']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Qualifier'} isArrayItem={true}>

									<InputAndErrors
										value={character.get('qualifier')}
										errors={character.getIn(['errors', 'qualifier'])}
										handleChange={event => this.handleChange(statePath.concat(['qualifier']), event)}
									/>

								</FieldsetComponent>

							</div>
						);

					})
				}

			</FieldsetComponent>
		);

	}

	renderCharacterGroups (characterGroups) {

		return (
			<Fieldset header={'Character groups'}>

				{
					characterGroups.map((characterGroup, index) => {

						const statePath = ['characterGroups', index];

						const isLastListItem = this.isLastListItem(index, characterGroups.size);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? this.handleCreationClick(statePath, event)
											: this.handleRemovalClick(statePath, event)
									}
								/>

								<FieldsetComponent label={'Name'} isArrayItem={true}>

									<InputAndErrors
										value={characterGroup.get('name')}
										errors={characterGroup.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(statePath.concat(['name']), event)}
									/>

								</FieldsetComponent>

								{ this.renderCharacters(characterGroup.get('characters'), statePath.concat(['characters'])) }

							</div>
						);

					})
				}

			</Fieldset>
		);

	}

	render () {

		if (this.props.redirectPath) return this.performRedirect();

		return (
			<FormWrapper
				action={this.props.action}
				handleSubmit={this.handleSubmit}
				handleDelete={this.handleDelete}
			>

				<Fieldset header={'Name'}>

					<InputAndErrors
						value={this.state.name}
						errors={this.state.errors?.get('name')}
						handleChange={event => this.handleChange(['name'], event)}
					/>

				</Fieldset>

				<Fieldset header={'Differentiator'}>

					<InputAndErrors
						value={this.state.differentiator}
						errors={this.state.errors?.get('differentiator')}
						handleChange={event => this.handleChange(['differentiator'], event)}
					/>

				</Fieldset>

				<Fieldset header={'Format'}>

					<InputAndErrors
						value={this.state.format}
						errors={this.state.errors?.get('format')}
						handleChange={event => this.handleChange(['format'], event)}
					/>

				</Fieldset>

				<Fieldset header={'Year'}>

					<InputAndErrors
						type={'number'}
						value={this.state.year}
						errors={this.state.errors?.get('year')}
						handleChange={event => this.handleChange(['year'], event)}
					/>

				</Fieldset>

				<Fieldset header={'Original version material'}>

					<FieldsetComponent label={'Name'}>

						<InputAndErrors
							value={this.state.originalVersionMaterial?.get('name')}
							errors={this.state.originalVersionMaterial?.getIn(['errors', 'name'])}
							handleChange={event => this.handleChange(['originalVersionMaterial', 'name'], event)}
						/>

					</FieldsetComponent>

					<FieldsetComponent label={'Differentiator'}>

						<InputAndErrors
							value={this.state.originalVersionMaterial?.get('differentiator')}
							errors={this.state.originalVersionMaterial?.getIn(['errors', 'differentiator'])}
							handleChange={event => this.handleChange(['originalVersionMaterial', 'differentiator'], event)}
						/>

					</FieldsetComponent>

				</Fieldset>

				{ Boolean(this.state.writingCredits) && this.renderWritingCredits(this.state.writingCredits) }

				{ Boolean(this.state.characterGroups) && this.renderCharacterGroups(this.state.characterGroups) }

			</FormWrapper>
		);

	}

}

MaterialForm.propTypes = {
	material: PropTypes.instanceOf(Map).isRequired,
	materialFormData: PropTypes.instanceOf(Map).isRequired
};

const mapStateToProps = state => ({
	material: state.get('material'),
	materialFormData: state.get('materialFormData')
});

export default connect(mapStateToProps, { createInstance, updateInstance, deleteInstance })(MaterialForm);
