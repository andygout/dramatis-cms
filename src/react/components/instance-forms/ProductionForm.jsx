import { List, Map, remove, set } from 'immutable';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { ArrayItemRemovalButton, Fieldset, FieldsetComponent, Form, FormWrapper, InputAndErrors } from '../form';
import { createInstance, updateInstance, deleteInstance } from '../../../redux/actions/model';

class ProductionForm extends Form {

	handleChangeToPerson (statePath, entity, event) {

		let revisedEntity = entity;
		revisedEntity = set(revisedEntity, 'model', event.target.value);
		revisedEntity = remove(revisedEntity, 'creditedMembers');

		const revision = { value: revisedEntity, type: 'map' };

		const rootAttr = statePath.shift();

		this.setState({ [rootAttr]: this.getNewStateForRootAttr(rootAttr, statePath, revision) });

	}

	handleChangeToCompany (statePath, entity, event) {

		const creditedMember = Map({ model: 'person', name: '', differentiator: '', errors: Map({}) });
		const creditedMembers = List([creditedMember]);

		let revisedEntity = entity;
		revisedEntity = set(revisedEntity, 'model', event.target.value);
		revisedEntity = set(revisedEntity, 'creditedMembers', creditedMembers);

		const revision = { value: revisedEntity, type: 'map' };

		const rootAttr = statePath.shift();

		this.setState({ [rootAttr]: this.getNewStateForRootAttr(rootAttr, statePath, revision) });

	}

	renderCastMemberRoles (roles, rolesStatePath) {

		return (
			<FieldsetComponent label={'Roles'} isArrayItem={true}>

				{
					roles.map((role, index) => {

						const statePath = rolesStatePath.concat([index]);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemRemovalButton
									isRemovalButtonRequired={this.isRemovalButtonRequired(index, roles.size)}
									handleRemovalClick={event => this.handleRemovalClick(statePath, event)}
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
					cast.map((castMember, index) =>
						<div className={'fieldset__module'} key={index}>

							<ArrayItemRemovalButton
								isRemovalButtonRequired={this.isRemovalButtonRequired(index, cast.size)}
								handleRemovalClick={event => this.handleRemovalClick(['cast', index], event)}
							/>

							<FieldsetComponent label={'Name'} isArrayItem={true}>

								<InputAndErrors
									value={castMember.get('name')}
									errors={castMember.getIn(['errors', 'name'])}
									handleChange={event => this.handleChange(['cast', index, 'name'], event)}
								/>

							</FieldsetComponent>

							<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

								<InputAndErrors
									value={castMember.get('differentiator')}
									errors={castMember.getIn(['errors', 'differentiator'])}
									handleChange={event => this.handleChange(['cast', index, 'differentiator'], event)}
								/>

							</FieldsetComponent>

							{ this.renderCastMemberRoles(castMember.get('roles'), ['cast', index, 'roles']) }

						</div>
					)
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

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemRemovalButton
									isRemovalButtonRequired={this.isRemovalButtonRequired(index, creditedMembers.size)}
									handleRemovalClick={event => this.handleRemovalClick(statePath, event)}
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

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemRemovalButton
									isRemovalButtonRequired={this.isRemovalButtonRequired(index, entities.size)}
									handleRemovalClick={event => this.handleRemovalClick(statePath, event)}
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
										value={'person'}
										checked={entity.get('model') === 'person'}
										onChange={event => this.handleChangeToPerson(statePath, entity, event)}
									/>
									<label>&nbsp;Person</label>

									<input
										type={'radio'}
										value={'company'}
										checked={entity.get('model') === 'company'}
										onChange={event => this.handleChangeToCompany(statePath, entity, event)}
									/>
									<label>&nbsp;Company</label>

								</FieldsetComponent>

								{
									entity.get('model') === 'company' &&
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

	renderCreativeCredits (creativeCredits) {

		return (
			<Fieldset header={'Creative team credits'}>

				{
					creativeCredits.map((creativeCredit, index) =>
						<div className={'fieldset__module'} key={index}>

							<ArrayItemRemovalButton
								isRemovalButtonRequired={this.isRemovalButtonRequired(index, creativeCredits.size)}
								handleRemovalClick={event => this.handleRemovalClick(['creativeCredits', index], event)}
							/>

							<FieldsetComponent label={'Name'} isArrayItem={true}>

								<InputAndErrors
									value={creativeCredit.get('name')}
									errors={creativeCredit.getIn(['errors', 'name'])}
									handleChange={event => this.handleChange(['creativeCredits', index, 'name'], event)}
								/>

							</FieldsetComponent>

							{ this.renderEntities(creativeCredit.get('entities'), ['creativeCredits', index, 'entities'], 'Creative') }

						</div>
					)
				}

			</Fieldset>
		);

	}

	renderCrewCredits (crewCredits) {

		return (
			<Fieldset header={'Crew credits'}>

				{
					crewCredits.map((crewCredit, index) =>
						<div className={'fieldset__module'} key={index}>

							<ArrayItemRemovalButton
								isRemovalButtonRequired={this.isRemovalButtonRequired(index, crewCredits.size)}
								handleRemovalClick={event => this.handleRemovalClick(['crewCredits', index], event)}
							/>

							<FieldsetComponent label={'Name'} isArrayItem={true}>

								<InputAndErrors
									value={crewCredit.get('name')}
									errors={crewCredit.getIn(['errors', 'name'])}
									handleChange={event => this.handleChange(['crewCredits', index, 'name'], event)}
								/>

							</FieldsetComponent>

							{ this.renderEntities(crewCredit.get('entities'), ['crewCredits', index, 'entities'], 'Crew') }

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

				<Fieldset header={'Theatre'}>

					<FieldsetComponent label={'Name'}>

						<InputAndErrors
							value={this.state.theatre?.get('name')}
							errors={this.state.theatre?.getIn(['errors', 'name'])}
							handleChange={event => this.handleChange(['theatre', 'name'], event)}
						/>

					</FieldsetComponent>

					<FieldsetComponent label={'Differentiator'}>

						<InputAndErrors
							value={this.state.theatre?.get('differentiator')}
							errors={this.state.theatre?.getIn(['errors', 'differentiator'])}
							handleChange={event => this.handleChange(['theatre', 'differentiator'], event)}
						/>

					</FieldsetComponent>

				</Fieldset>

				{ !!this.state.cast && this.renderCast(this.state.cast) }

				{ !!this.state.creativeCredits && this.renderCreativeCredits(this.state.creativeCredits) }

				{ !!this.state.crewCredits && this.renderCrewCredits(this.state.crewCredits) }

			</FormWrapper>
		);

	}

}

ProductionForm.propTypes = {
	production: ImmutablePropTypes.map.isRequired,
	productionFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	production: state.get('production'),
	productionFormData: state.get('productionFormData')
});

export default connect(mapStateToProps, { createInstance, updateInstance, deleteInstance })(ProductionForm);
