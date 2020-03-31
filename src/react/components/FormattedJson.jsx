import React from 'react';

const FormattedJson = props => {

	return (
		<pre>
			{ JSON.stringify(props.data, null, 4) }
		</pre>
	);

};

export default FormattedJson;
