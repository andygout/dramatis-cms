import React from 'react';

const InputErrors = props => {

	const { errors, statePath } = props;

	return (
		!!errors && errors.map(errorText =>
			<ul key={`${statePath.join('-')}-error`}>

				<li className="field__error-list-item">{errorText}</li>

			</ul>
		)
	);

};

export default InputErrors;
