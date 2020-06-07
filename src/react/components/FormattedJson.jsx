import React from 'react';

export default function (props) {

	return (
		<pre>
			{ JSON.stringify(props.data, null, 4) }
		</pre>
	);

};
