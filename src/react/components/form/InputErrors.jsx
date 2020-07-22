import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const InputErrors = props => {

	const { errors, statePath } = props;

	return (
		!!errors && errors.map(errorText =>
			<ul key={`${statePath.join('-')}-error`}>

				<li className="field__error-list-item">{ errorText }</li>

			</ul>
		)
	);

};

InputErrors.propTypes = {
	errors: ImmutablePropTypes.list,
	statePath: PropTypes.array
};

export default InputErrors;
