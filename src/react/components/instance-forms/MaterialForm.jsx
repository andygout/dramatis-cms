import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { ArrayItemRemovalButton, Fieldset, FieldsetComponent, Form, FormWrapper, InputAndErrors } from '../form';
import { createInstance, updateInstance, deleteInstance } from '../../../redux/actions/model';
import { CREDIT_TYPES } from '../../../utils/constants';

class MaterialForm extends Form {

	renderWritingEntities (writingEntities, writingEntitiesStatePath) {

		return (
			<FieldsetComponent label={'Writing entities (people, materials)'} isArrayItem={true}>

				{
					writingEntities.map((writingEntity, index) => {

						const statePath = writingEntitiesStatePath.concat([index]);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemRemovalButton
									isRemovalButtonRequired={this.isRemovalButtonRequired(index, writingEntities.size)}
									handleRemovalClick={event => this.handleRemovalClick(statePath, event)}
								/>

								<FieldsetComponent label={'Name'} isArrayItem={true}>

									<InputAndErrors
										value={writingEntity.get('name')}
										errors={writingEntity.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(statePath.concat(['name']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={writingEntity.get('differentiator')}
										errors={writingEntity.getIn(['errors', 'differentiator'])}
										handleChange={event => this.handleChange(statePath.concat(['differentiator']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Model'} isArrayItem={true}>

									<input
										type={'radio'}
										value={'person'}
										checked={writingEntity.get('model') === 'person'}
										onChange={event => this.handleChange(statePath.concat(['model']), event)}
									/>
									<label>&nbsp;Person</label>

									<input
										type={'radio'}
										value={'material'}
										checked={writingEntity.get('model') === 'material'}
										onChange={event => this.handleChange(statePath.concat(['model']), event)}
									/>
									<label>&nbsp;Material</label>

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
					writingCredits.map((writingCredit, index) =>
						<div className={'fieldset__module'} key={index}>

							<ArrayItemRemovalButton
								isRemovalButtonRequired={this.isRemovalButtonRequired(index, writingCredits.size)}
								handleRemovalClick={event => this.handleRemovalClick(['writingCredits', index], event)}
							/>

							<FieldsetComponent label={'Name'} isArrayItem={true}>

								<InputAndErrors
									value={writingCredit.get('name')}
									errors={writingCredit.getIn(['errors', 'name'])}
									handleChange={event => this.handleChange(['writingCredits', index, 'name'], event)}
								/>

							</FieldsetComponent>

							<FieldsetComponent label={'Credit type'} isArrayItem={true}>

								<input
									type={'radio'}
									value={''}
									checked={!writingCredit.get('creditType')}
									onChange={event => this.handleChange(['writingCredits', index, 'creditType'], event)}
								/>
								<label>&nbsp;Direct</label>

								<input
									type={'radio'}
									value={CREDIT_TYPES.NON_SPECIFIC_SOURCE_MATERIAL}
									checked={writingCredit.get('creditType') === CREDIT_TYPES.NON_SPECIFIC_SOURCE_MATERIAL}
									onChange={event => this.handleChange(['writingCredits', index, 'creditType'], event)}
								/>
								<label>&nbsp;Non-specific source material</label>

							</FieldsetComponent>

							{ this.renderWritingEntities(writingCredit.get('writingEntities'), ['writingCredits', index, 'writingEntities']) }

						</div>
					)
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

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemRemovalButton
									isRemovalButtonRequired={this.isRemovalButtonRequired(index, characters.size)}
									handleRemovalClick={event => this.handleRemovalClick(statePath, event)}
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
					characterGroups.map((characterGroup, index) =>
						<div className={'fieldset__module'} key={index}>

							<ArrayItemRemovalButton
								isRemovalButtonRequired={this.isRemovalButtonRequired(index, characterGroups.size)}
								handleRemovalClick={event => this.handleRemovalClick(['characterGroups', index], event)}
							/>

							<FieldsetComponent label={'Name'} isArrayItem={true}>

								<InputAndErrors
									value={characterGroup.get('name')}
									errors={characterGroup.getIn(['errors', 'name'])}
									handleChange={event => this.handleChange(['characterGroups', index, 'name'], event)}
								/>

							</FieldsetComponent>

							{ this.renderCharacters(characterGroup.get('characters'), ['characterGroups', index, 'characters']) }

						</div>
					)
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

				{ !!this.state.writingCredits && this.renderWritingCredits(this.state.writingCredits) }

				{ !!this.state.characterGroups && this.renderCharacterGroups(this.state.characterGroups) }

			</FormWrapper>
		);

	}

}

MaterialForm.propTypes = {
	material: ImmutablePropTypes.map.isRequired,
	materialFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	material: state.get('material'),
	materialFormData: state.get('materialFormData')
});

export default connect(mapStateToProps, { createInstance, updateInstance, deleteInstance })(MaterialForm);
