import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { ArrayItemRemovalButton, Fieldset, FieldsetComponent, Form, FormWrapper, InputAndErrors } from '../form';
import { createInstance, updateInstance, deleteInstance } from '../../../redux/actions/model';

class ProductionForm extends Form {

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

				<Fieldset header={'Playtext'}>

					<FieldsetComponent label={'Name'}>

						<InputAndErrors
							value={this.state.playtext?.get('name')}
							errors={this.state.playtext?.getIn(['errors', 'name'])}
							handleChange={event => this.handleChange(['playtext', 'name'], event)}
						/>

					</FieldsetComponent>

					<FieldsetComponent label={'Differentiator'}>

						<InputAndErrors
							value={this.state.playtext?.get('differentiator')}
							errors={this.state.playtext?.getIn(['errors', 'differentiator'])}
							handleChange={event => this.handleChange(['playtext', 'differentiator'], event)}
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
