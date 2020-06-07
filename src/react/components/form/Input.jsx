import classNames from 'classnames';
import React from 'react';

export default function (props) {

	const { value, hasErrors, handleChange } = props;

	const className = classNames({
		'field__input': true,
		'field__input--has-errors': hasErrors
	});

	return (
		<input
			value={value}
			className={className}
			maxLength="1000"
			type="text"
			onChange={handleChange}
		/>
	);

};
