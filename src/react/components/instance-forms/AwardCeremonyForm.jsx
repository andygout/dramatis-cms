import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ArrayItemActionButton, Fieldset, FieldsetComponent, Form, FormWrapper, InputAndErrors } from '../form';
import { createInstance, updateInstance, deleteInstance } from '../../../redux/actions/model';
import { MODELS } from '../../../utils/constants';

class AwardCeremonyForm extends Form {

	renderMembers (members, membersStatePath) {

		return (
			<FieldsetComponent label={'Nominated members (people)'} isArrayItem={true}>

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

								<FieldsetComponent label={'Name'} isArrayItem={true}>

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

	renderEntities (entities, entitiesStatePath) {

		return (
			<FieldsetComponent label={'Nominees (people, companies)'} isArrayItem={true}>

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
										onChange={event => this.handleChangeToPerson(statePath, entity, 'members', event)}
									/>
									<label>&nbsp;Person</label>

									<input
										type={'radio'}
										value={MODELS.COMPANY}
										checked={entity.get('model') === MODELS.COMPANY}
										onChange={event => this.handleChangeToCompany(statePath, entity, 'members', event)}
									/>
									<label>&nbsp;Company</label>

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

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? this.handleCreationClick(statePath, event)
											: this.handleRemovalClick(statePath, event)
									}
								/>

								{ this.renderEntities(nomination.get('entities'), statePath.concat('entities')) }

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

								<FieldsetComponent label={'Name'} isArrayItem={true}>

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
	awardCeremony: PropTypes.instanceOf(Map).isRequired,
	awardCeremonyFormData: PropTypes.instanceOf(Map).isRequired
};

const mapStateToProps = state => ({
	awardCeremony: state.get('awardCeremony'),
	awardCeremonyFormData: state.get('awardCeremonyFormData')
});

export default connect(mapStateToProps, { createInstance, updateInstance, deleteInstance })(AwardCeremonyForm);
