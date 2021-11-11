import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ArrayItemActionButton, Fieldset, FieldsetComponent, Form, FormWrapper, InputAndErrors } from '../form';
import { createInstance, updateInstance, deleteInstance } from '../../../redux/actions/model';
import { MODELS } from '../../../utils/constants';

class ProductionForm extends Form {

	renderCastMemberRoles (roles, rolesStatePath) {

		return (
			<FieldsetComponent label={'Roles'} isArrayItem={true}>

				{
					roles.map((role, index) => {

						const statePath = rolesStatePath.concat([index]);

						const isLastListItem = this.isLastListItem(index, roles.size);

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
										value={role.get('name')}
										errors={role.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(statePath.concat(['name']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Character name'} isArrayItem={true}>

									<InputAndErrors
										value={role.get('characterName')}
										errors={role.getIn(['errors', 'characterName'])}
										handleChange={event => this.handleChange(statePath.concat(['characterName']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Character differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={role.get('characterDifferentiator')}
										errors={role.getIn(['errors', 'characterDifferentiator'])}
										handleChange={event => this.handleChange(statePath.concat(['characterDifferentiator']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Qualifier'} isArrayItem={true}>

									<InputAndErrors
										value={role.get('qualifier')}
										errors={role.getIn(['errors', 'qualifier'])}
										handleChange={event => this.handleChange(statePath.concat(['qualifier']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Alternate'} isArrayItem={true}>

									<input
										type="checkbox"
										checked={role.get('isAlternate') || false}
										onChange={event => this.handleChange(statePath.concat(['isAlternate']), event)}
									/>

								</FieldsetComponent>

							</div>
						);

					})
				}

			</FieldsetComponent>
		);

	}

	renderCast (cast) {

		return (
			<Fieldset header={'Cast'}>

				{
					cast.map((castMember, index) => {

						const statePath = ['cast', index];

						const isLastListItem = this.isLastListItem(index, cast.size);

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
										value={castMember.get('name')}
										errors={castMember.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(statePath.concat(['name']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={castMember.get('differentiator')}
										errors={castMember.getIn(['errors', 'differentiator'])}
										handleChange={event => this.handleChange(statePath.concat(['differentiator']), event)}
									/>

								</FieldsetComponent>

								{ this.renderCastMemberRoles(castMember.get('roles'), statePath.concat(['roles'])) }

							</div>
						);

					})
				}

			</Fieldset>
		);

	}

	renderCreditedMembers (creditedMembers, creditedMembersStatePath) {

		return (
			<FieldsetComponent label={'Credited members (people)'} isArrayItem={true}>

				{
					creditedMembers.map((creditedMember, index) => {

						const statePath = creditedMembersStatePath.concat([index]);

						const isLastListItem = this.isLastListItem(index, creditedMembers.size);

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
										value={creditedMember.get('name')}
										errors={creditedMember.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(statePath.concat(['name']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={creditedMember.get('differentiator')}
										errors={creditedMember.getIn(['errors', 'differentiator'])}
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

	renderEntities (entities, entitiesStatePath, teamName) {

		return (
			<FieldsetComponent label={`${teamName} entities (people, companies)`} isArrayItem={true}>

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
										onChange={event => this.handleChangeToPerson(statePath, entity, 'creditedMembers', event)}
									/>
									<label>&nbsp;Person</label>

									<input
										type={'radio'}
										value={MODELS.COMPANY}
										checked={entity.get('model') === MODELS.COMPANY}
										onChange={event => this.handleChangeToCompany(statePath, entity, 'creditedMembers', event)}
									/>
									<label>&nbsp;Company</label>

								</FieldsetComponent>

								{
									entity.get('model') === MODELS.COMPANY &&
									this.renderCreditedMembers(
										entity.get('creditedMembers', []),
										statePath.concat(['creditedMembers'])
									)
								}

							</div>
						);

					})
				}

			</FieldsetComponent>
		);

	}

	renderProducerCredits (producerCredits) {

		return (
			<Fieldset header={'Producer team credits'}>

				{
					producerCredits.map((producerCredit, index) => {

						const statePath = ['producerCredits', index];

						const isLastListItem = this.isLastListItem(index, producerCredits.size);

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
										value={producerCredit.get('name')}
										errors={producerCredit.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(statePath.concat(['name']), event)}
									/>

								</FieldsetComponent>

								{ this.renderEntities(producerCredit.get('entities'), statePath.concat(['entities']), 'Producer') }

							</div>
						);

					})
				}

			</Fieldset>
		);

	}

	renderCreativeCredits (creativeCredits) {

		return (
			<Fieldset header={'Creative team credits'}>

				{
					creativeCredits.map((creativeCredit, index) => {

						const statePath = ['creativeCredits', index];

						const isLastListItem = this.isLastListItem(index, creativeCredits.size);

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
										value={creativeCredit.get('name')}
										errors={creativeCredit.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(statePath.concat(['name']), event)}
									/>

								</FieldsetComponent>

								{ this.renderEntities(creativeCredit.get('entities'), statePath.concat(['entities']), 'Creative') }

							</div>
						);

					})
				}

			</Fieldset>
		);

	}

	renderCrewCredits (crewCredits) {

		return (
			<Fieldset header={'Crew credits'}>

				{
					crewCredits.map((crewCredit, index) => {

						const statePath = ['crewCredits', index];

						const isLastListItem = this.isLastListItem(index, crewCredits.size);

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
										value={crewCredit.get('name')}
										errors={crewCredit.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(statePath.concat(['name']), event)}
									/>

								</FieldsetComponent>

								{ this.renderEntities(crewCredit.get('entities'), statePath.concat(['entities']), 'Crew') }

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

				<Fieldset header={'Dates'}>

					<FieldsetComponent label={'Start date'}>

						<InputAndErrors
							type={'date'}
							value={this.state.startDate}
							errors={this.state.errors?.get('startDate')}
							handleChange={event => this.handleChange(['startDate'], event)}
						/>

					</FieldsetComponent>

					<FieldsetComponent label={'Press date'}>

						<InputAndErrors
							type={'date'}
							value={this.state.pressDate}
							errors={this.state.errors?.get('pressDate')}
							handleChange={event => this.handleChange(['pressDate'], event)}
						/>

					</FieldsetComponent>

					<FieldsetComponent label={'End date'}>

						<InputAndErrors
							type={'date'}
							value={this.state.endDate}
							errors={this.state.errors?.get('endDate')}
							handleChange={event => this.handleChange(['endDate'], event)}
						/>

					</FieldsetComponent>

				</Fieldset>

				<Fieldset header={'Material'}>

					<FieldsetComponent label={'Name'}>

						<InputAndErrors
							value={this.state.material?.get('name')}
							errors={this.state.material?.getIn(['errors', 'name'])}
							handleChange={event => this.handleChange(['material', 'name'], event)}
						/>

					</FieldsetComponent>

					<FieldsetComponent label={'Differentiator'}>

						<InputAndErrors
							value={this.state.material?.get('differentiator')}
							errors={this.state.material?.getIn(['errors', 'differentiator'])}
							handleChange={event => this.handleChange(['material', 'differentiator'], event)}
						/>

					</FieldsetComponent>

				</Fieldset>

				<Fieldset header={'Venue'}>

					<FieldsetComponent label={'Name'}>

						<InputAndErrors
							value={this.state.venue?.get('name')}
							errors={this.state.venue?.getIn(['errors', 'name'])}
							handleChange={event => this.handleChange(['venue', 'name'], event)}
						/>

					</FieldsetComponent>

					<FieldsetComponent label={'Differentiator'}>

						<InputAndErrors
							value={this.state.venue?.get('differentiator')}
							errors={this.state.venue?.getIn(['errors', 'differentiator'])}
							handleChange={event => this.handleChange(['venue', 'differentiator'], event)}
						/>

					</FieldsetComponent>

				</Fieldset>

				{ Boolean(this.state.producerCredits) && this.renderProducerCredits(this.state.producerCredits) }

				{ Boolean(this.state.cast) && this.renderCast(this.state.cast) }

				{ Boolean(this.state.creativeCredits) && this.renderCreativeCredits(this.state.creativeCredits) }

				{ Boolean(this.state.crewCredits) && this.renderCrewCredits(this.state.crewCredits) }

			</FormWrapper>
		);

	}

}

ProductionForm.propTypes = {
	production: PropTypes.instanceOf(Map).isRequired,
	productionFormData: PropTypes.instanceOf(Map).isRequired
};

const mapStateToProps = state => ({
	production: state.get('production'),
	productionFormData: state.get('productionFormData')
});

export default connect(mapStateToProps, { createInstance, updateInstance, deleteInstance })(ProductionForm);
