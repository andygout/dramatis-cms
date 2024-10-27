import PropTypes from 'prop-types';

const Fieldset = props => {

	const { header, children } = props;

	return (
		<fieldset className="fieldset">

			<h2 className="fieldset__header">{ header }:</h2>

			{ children }

		</fieldset>
	);

};

Fieldset.propTypes = {
	header: PropTypes.string.isRequired,
	children: PropTypes.node
};

export default Fieldset;
