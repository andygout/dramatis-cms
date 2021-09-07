import { List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

const InputErrors = props => {

	const { errors } = props;

	return (
		errors.map((errorText, index) =>
			<ul key={index}>

				<li className="field__error-list-item">{ errorText }</li>

			</ul>
		)
	);

};

InputErrors.propTypes = {
	errors: PropTypes.instanceOf(List).isRequired
};

export default InputErrors;
