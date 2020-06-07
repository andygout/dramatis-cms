import React from 'react';

export default function (props) {

	const { errors, statePath } = props;

	return (
		!!errors && errors.map(errorText =>
			<ul key={`${statePath.join('-')}-error`}>

				<li className="field__error-list-item">{errorText}</li>

			</ul>
		)
	);

};
