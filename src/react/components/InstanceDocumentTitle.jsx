import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import { FORM_ACTIONS } from '../../utils/constants';

const InstanceDocumentTitle = props => {

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

InstanceDocumentTitle.propTypes = {
	name: PropTypes.string.isRequired,
	model: PropTypes.string.isRequired,
	formAction: PropTypes.string.isRequired
};

export default InstanceDocumentTitle;
