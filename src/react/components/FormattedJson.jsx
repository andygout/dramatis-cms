import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const FormattedJson = props => {

	return (
		<pre>
			{ JSON.stringify(props.data, null, 4) }
		</pre>
	);

};

FormattedJson.propTypes = {
	data: PropTypes.oneOfType([
		ImmutablePropTypes.list.isRequired,
		ImmutablePropTypes.map.isRequired
	])
};

export default FormattedJson;
