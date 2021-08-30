import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import getDifferentiatorSuffix from '../../lib/get-differentiator-suffix';
import { FORM_ACTIONS, MODEL_TO_DISPLAY_NAME_MAP } from '../../utils/constants';

const InstanceDocumentTitle = props => {

	const { name, differentiator, model, formAction } = props;

	const documentTitle = (action => {

		const modelDisplayName = MODEL_TO_DISPLAY_NAME_MAP[model];

		switch (action) {

			case FORM_ACTIONS.create:
				return `New ${modelDisplayName}`;

			case FORM_ACTIONS.update: {

				let text = `Edit: ${name} (${modelDisplayName})`;

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
