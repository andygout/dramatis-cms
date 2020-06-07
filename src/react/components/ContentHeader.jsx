import React from 'react';

export default function (props) {

	const { text } = props;

	return (
		text
			? (
				<div className="content-header">
					{text}
				</div>
			)
			: null
	);

};
