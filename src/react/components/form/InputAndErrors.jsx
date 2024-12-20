import PropTypes from 'prop-types';

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

InputAndErrors.propTypes = {
	type: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	errors: PropTypes.array,
	handleChange: PropTypes.func.isRequired
};

export default InputAndErrors;
