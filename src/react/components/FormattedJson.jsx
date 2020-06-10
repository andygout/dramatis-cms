import React from 'react';

export default props => {

	return (
		<pre>
			{ JSON.stringify(props.data, null, 4) }
		</pre>
	);

};
