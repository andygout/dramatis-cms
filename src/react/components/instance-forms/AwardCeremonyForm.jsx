import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { Fieldset, FieldsetComponent, Form, FormWrapper, InputAndErrors } from '../form';
import { createInstance, updateInstance, deleteInstance } from '../../../redux/actions/model';

class AwardCeremonyForm extends Form {

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
