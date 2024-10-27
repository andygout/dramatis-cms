import PropTypes from 'prop-types';

const InputErrors = props => {

	const { errors } = props;

	return (
		errors.map((errorText, index) =>
			<ul key={index}>

				<li className="field__error-list-item">{ errorText }</li>

			</ul>
		)
	);

};

InputErrors.propTypes = {
	errors: PropTypes.array.isRequired
};

export default InputErrors;
