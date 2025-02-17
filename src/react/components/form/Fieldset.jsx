const Fieldset = props => {

	const { header, children } = props;

	return (
		<fieldset className="fieldset">

			<h2 className="fieldset__header">{ header }:</h2>

			{ children }

		</fieldset>
	);

};

export default Fieldset;
