import classNames from 'classnames';

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

export default Input;
