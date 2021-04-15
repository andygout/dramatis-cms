import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

const Input = props => {

	const { type, value, hasErrors, handleChange } = props;

	const className = classNames({
		'field__input': true,
		'field__input--has-errors': hasErrors
	});

	return (
		<input
			type={type || 'text'}
			value={value || ''}
			className={className}
			maxLength="1000"
			onChange={handleChange}
		/>
	);

};

Input.propTypes = {
	type: PropTypes.string,
	value: PropTypes.string,
	hasErrors: PropTypes.bool.isRequired,
	handleChange: PropTypes.func.isRequired
};

export default Input;
