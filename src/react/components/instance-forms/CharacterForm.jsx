import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { Fieldset, Form, FormWrapper, InputAndErrors } from '../form';
import { createInstance, updateInstance, deleteInstance } from '../../../redux/actions/model';

class CharacterForm extends Form {

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

			</FormWrapper>
		);

	}

}

CharacterForm.propTypes = {
	character: ImmutablePropTypes.map.isRequired,
	characterFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	character: state.get('character'),
	characterFormData: state.get('characterFormData')
});

export default connect(mapStateToProps, { createInstance, updateInstance, deleteInstance })(CharacterForm);
