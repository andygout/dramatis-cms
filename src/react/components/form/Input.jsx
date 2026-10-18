import classNames from 'classnames';
import { useContext } from 'react';

import { FieldIdContext } from './FieldsetComponent.jsx';

const Input = (props) => {
	const { type, value, hasErrors, handleChange } = props;

	const fieldId = useContext(FieldIdContext);

	const className = classNames({
		field__input: true,
		'field__input--has-errors': hasErrors
	});

	return (
		<input
			id={fieldId}
			type={type || 'text'}
			value={value || ''}
			className={className}
			maxLength="1000"
			onChange={handleChange}
		/>
	);
};

export default Input;
