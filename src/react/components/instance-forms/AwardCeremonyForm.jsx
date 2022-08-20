import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { capitalise } from '../../../lib/strings';
import { ArrayItemActionButton, Fieldset, FieldsetComponent, Form, FormWrapper, InputAndErrors } from '../form';
import { createInstance, updateInstance, deleteInstance } from '../../../redux/actions/model';
import { MODELS } from '../../../utils/constants';

class AwardCeremonyForm extends Form {

	renderMembers (members, membersStatePath) {

		return (
			<FieldsetComponent label={'Nominated company members (people)'} isArrayItem={true}>

				{
					members.map((member, index) => {

						const statePath = membersStatePath.concat([index]);

						const isLastListItem = this.isLastListItem(index, members.size);

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

								<FieldsetComponent label={'Person name'} isArrayItem={true}>

									<InputAndErrors
										value={member.get('name')}
										errors={member.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(statePath.concat(['name']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={member.get('differentiator')}
										errors={member.getIn(['errors', 'differentiator'])}
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

	renderMaterials (materials, materialsStatePath) {

		return (
			<FieldsetComponent label={'Nominated materials'} isArrayItem={true}>

				{
					materials.map((material, index) => {

						const statePath = materialsStatePath.concat([index]);

						const isLastListItem = this.isLastListItem(index, materials.size);

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

								<FieldsetComponent label={'Material name'} isArrayItem={true}>

									<InputAndErrors
										value={material.get('name')}
										errors={material.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(statePath.concat(['name']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={material.get('differentiator')}
										errors={material.getIn(['errors', 'differentiator'])}
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

	renderProductions (productions, productionsStatePath) {

		return (
			<FieldsetComponent label={'Nominated productions'} isArrayItem={true}>

				{
					productions.map((production, index) => {

						const statePath = productionsStatePath.concat([index]);

						const isLastListItem = this.isLastListItem(index, productions.size);

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

								<FieldsetComponent label={'Production UUID'} isArrayItem={true}>

									<InputAndErrors
										value={production.get('uuid')}
										errors={production.getIn(['errors', 'uuid'])}
										handleChange={event => this.handleChange(statePath.concat(['uuid']), event)}
									/>

								</FieldsetComponent>

							</div>
						);

					})
				}

			</FieldsetComponent>
		);

	}

	renderEntities (entities, entitiesStatePath) {

		return (
			<FieldsetComponent label={'Nominated entities (people, companies)'} isArrayItem={true}>

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

								<FieldsetComponent label={`${capitalise(entity.get('model'))} name`} isArrayItem={true}>

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
										onChange={event => this.handleChangeToPerson(statePath, entity, event)}
									/>
									<label>{' Person'}</label>

									<input
										type={'radio'}
										value={MODELS.COMPANY}
										checked={entity.get('model') === MODELS.COMPANY}
										onChange={event => this.handleChangeToCompany(statePath, entity, event)}
									/>
									<label>{' Company'}</label>

								</FieldsetComponent>

								{
									entity.get('model') === MODELS.COMPANY &&
									this.renderMembers(entity.get('members', []), statePath.concat(['members']))
								}

							</div>
						);

					})
				}

			</FieldsetComponent>
		);

	}

	renderNominations (nominations, nominationsStatePath) {

		return (
			<FieldsetComponent label={'Nominations'} isArrayItem={true}>

				{
					nominations.map((nomination, index) => {

						const statePath = nominationsStatePath.concat([index]);

						const isLastListItem = this.isLastListItem(index, nominations.size);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<FieldsetComponent label={'Winner'} isArrayItem={true}>

									<input
										type="checkbox"
										checked={nomination.get('isWinner')}
										onChange={event => this.handleChange(statePath.concat(['isWinner']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Custom type'}>

									<InputAndErrors
										value={nomination.get('customType')}
										errors={nomination.getIn(['errors', 'customType'])}
										handleChange={event => this.handleChange(statePath.concat(['customType']), event)}
									/>

								</FieldsetComponent>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? this.handleCreationClick(statePath, event)
											: this.handleRemovalClick(statePath, event)
									}
								/>

								{ this.renderEntities(nomination.get('entities'), statePath.concat('entities')) }

								{ this.renderProductions(nomination.get('productions'), statePath.concat('productions')) }

								{ this.renderMaterials(nomination.get('materials'), statePath.concat('materials')) }

							</div>
						);

					})
				}

			</FieldsetComponent>
		);

	}

	renderCategories (categories) {

		return (
			<Fieldset header={'Categories'}>

				{
					categories?.map((category, index) => {

						const statePath = ['categories', index];

						const isLastListItem = this.isLastListItem(index, categories.size);

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

								<FieldsetComponent label={'Category name'} isArrayItem={true}>

									<InputAndErrors
										value={category.get('name')}
										errors={category.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(statePath.concat(['name']), event)}
									/>

								</FieldsetComponent>

								{ this.renderNominations(category.get('nominations'), statePath.concat(['nominations'])) }

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

				<Fieldset header={'Award'}>

					<FieldsetComponent label={'Name'}>

						<InputAndErrors
							value={this.state.award?.get('name')}
							errors={this.state.award?.getIn(['errors', 'name'])}
							handleChange={event => this.handleChange(['award', 'name'], event)}
						/>

					</FieldsetComponent>

					<FieldsetComponent label={'Differentiator'}>

						<InputAndErrors
							value={this.state.award?.get('differentiator')}
							errors={this.state.award?.getIn(['errors', 'differentiator'])}
							handleChange={event => this.handleChange(['award', 'differentiator'], event)}
						/>

					</FieldsetComponent>

				</Fieldset>

				{ Boolean(this.state.categories) && this.renderCategories(this.state.categories) }

			</FormWrapper>
		);

	}

}

AwardCeremonyForm.propTypes = {
	awardCeremony: ImmutablePropTypes.map.isRequired,
	awardCeremonyFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	awardCeremony: state.get('awardCeremony'),
	awardCeremonyFormData: state.get('awardCeremonyFormData')
});

export default connect(mapStateToProps, { createInstance, updateInstance, deleteInstance })(AwardCeremonyForm);
