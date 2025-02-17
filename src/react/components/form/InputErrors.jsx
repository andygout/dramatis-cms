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

export default InputErrors;
