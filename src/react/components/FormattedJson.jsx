import { List, Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

const FormattedJson = props => {

	return (
		<pre>
			{ JSON.stringify(props.data, null, 4) }
		</pre>
	);

};

FormattedJson.propTypes = {
	data: PropTypes.oneOfType([
		PropTypes.instanceOf(List).isRequired,
		PropTypes.instanceOf(Map).isRequired
	])
};

export default FormattedJson;
