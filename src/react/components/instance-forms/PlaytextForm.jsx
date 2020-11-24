import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { ArrayItemRemovalButton, Fieldset, FieldsetComponent, Form, FormWrapper, InputAndErrors } from '../form';
import { createInstance, updateInstance, deleteInstance } from '../../../redux/actions/model';

class PlaytextForm extends Form {

	renderWriters (writers, writersStatePath) {

		return (
			<FieldsetComponent label={'Writers'} isArrayItem={true}>

				{
					writers.map((writer, index) => {

						const statePath = writersStatePath.concat([index]);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemRemovalButton
									isRemovalButtonRequired={this.isRemovalButtonRequired(index, writers.size)}
									handleRemovalClick={event => this.handleRemovalClick(statePath, event)}
								/>

								<FieldsetComponent label={'Name'} isArrayItem={true}>

									<InputAndErrors
										value={writer.get('name')}
										errors={writer.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(statePath.concat(['name']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={writer.get('differentiator')}
										errors={writer.getIn(['errors', 'differentiator'])}
										handleChange={event => this.handleChange(statePath.concat(['differentiator']), event)}
									/>

								</FieldsetComponent>

							</div>
						);

					})
				}

			</FieldsetComponent>
		);

	}

	renderWriterGroups (writerGroups) {

		return (
			<Fieldset header={'Writer groups'}>

				{
					writerGroups.map((writerGroup, index) => {

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemRemovalButton
									isRemovalButtonRequired={this.isRemovalButtonRequired(index, writerGroups.size)}
									handleRemovalClick={event => this.handleRemovalClick(['writerGroups', index], event)}
								/>

								<FieldsetComponent label={'Name'} isArrayItem={true}>

									<InputAndErrors
										value={writerGroup.get('name')}
										errors={writerGroup.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(['writerGroups', index, 'name'], event)}
									/>

								</FieldsetComponent>

								{ this.renderWriters(writerGroup.get('writers'), ['writerGroups', index, 'writers']) }

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
					characterGroups.map((characterGroup, index) => {

						return (
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

				{ !!this.state.writerGroups && this.renderWriterGroups(this.state.writerGroups) }

				{ !!this.state.characterGroups && this.renderCharacterGroups(this.state.characterGroups) }

			</FormWrapper>
		);

	}

}

PlaytextForm.propTypes = {
	playtext: ImmutablePropTypes.map.isRequired,
	playtextFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	playtext: state.get('playtext'),
	playtextFormData: state.get('playtextFormData')
});

export default connect(mapStateToProps, { createInstance, updateInstance, deleteInstance })(PlaytextForm);
