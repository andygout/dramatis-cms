import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { Fieldset, Form, FormWrapper, InputAndErrors } from '../form';
import { createInstance, updateInstance, deleteInstance } from '../../../redux/actions/model';

class PersonForm extends Form {

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

PersonForm.propTypes = {
	person: PropTypes.instanceOf(Map).isRequired,
	personFormData: PropTypes.instanceOf(Map).isRequired
};

const mapStateToProps = state => ({
	person: state.get('person'),
	personFormData: state.get('personFormData')
});

export default connect(mapStateToProps, { createInstance, updateInstance, deleteInstance })(PersonForm);
