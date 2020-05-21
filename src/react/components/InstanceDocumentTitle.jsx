import React from 'react';
import { Helmet } from 'react-helmet';

const DocumentTitle = props => {

	const { instance } = props;

	const name = instance.get('name');
	const model = instance.get('model');

	if (name === undefined && model === undefined) return null;

	const text = (name === '')
		? `New ${model}`
		: `${name} (${model})`;

	return (
		<Helmet title={text} />
	);

};

export default DocumentTitle;
