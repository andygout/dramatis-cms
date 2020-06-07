import React from 'react';
import { Helmet } from 'react-helmet';

import { FORM_ACTIONS } from '../../utils/constants';

const DocumentTitle = props => {

	const { name, model, formAction } = props;

	const text = (action => {

		switch (action) {

			case FORM_ACTIONS.create:
				return `New ${model}`;

			case FORM_ACTIONS.update:
				return `${name} (${model})`;

			default:
				return '';

		}

	})(formAction);

	return (
		<Helmet title={text} />
	);

};

export default DocumentTitle;
