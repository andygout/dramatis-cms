import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

const Input = props => {

	const { value, hasErrors, handleChange } = props;

	const className = classNames({
		'field__input': true,
		'field__input--has-errors': hasErrors
	});

	return (
		<input
			value={value || ''}
			className={className}
			maxLength="1000"
			type="text"
			onChange={handleChange}
		/>
	);

};

Input.propTypes = {
	value: PropTypes.string,
	hasErrors: PropTypes.bool.isRequired,
	handleChange: PropTypes.func.isRequired
};

export default Input;
