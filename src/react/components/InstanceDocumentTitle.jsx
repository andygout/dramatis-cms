import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import getDifferentiatorSuffix from '../../lib/get-differentiator-suffix';
import { FORM_ACTIONS } from '../../utils/constants';

const InstanceDocumentTitle = props => {

	const { name, differentiator, model, formAction } = props;

	const documentTitle = (action => {

		switch (action) {

			case FORM_ACTIONS.create:
				return `New ${model}`;

			case FORM_ACTIONS.update: {

				let text = `Edit: ${name} (${model})`;

				text += getDifferentiatorSuffix(differentiator);

				return text;

			}

		}

	})(formAction);

	return (
		<Helmet title={documentTitle} />
	);

};

InstanceDocumentTitle.propTypes = {
	name: PropTypes.string.isRequired,
	differentiator: PropTypes.string,
	model: PropTypes.string.isRequired,
	formAction: PropTypes.string.isRequired
};

export default InstanceDocumentTitle;
