import Input from './Input.jsx';
import InputErrors from './InputErrors.jsx';

const InputAndErrors = props => {

	const { type, value, errors, handleChange } = props;

	return (
		<>

			<Input
				type={type}
				value={value}
				hasErrors={Boolean(errors)}
				handleChange={handleChange}
			/>

			{
				Boolean(errors) && (
					<InputErrors errors={errors} />
				)
			}

		</>
	);

};

export default InputAndErrors;
