import PropTypes from 'prop-types';
import React from 'react';

import { FORM_ACTIONS } from '../../utils/constants';

const withInstancePageTitle = PageTitle => props => {

	const { name, differentiator, model, formAction } = props;

	const pageTitle = (action => {

		switch (action) {

			case FORM_ACTIONS.create:
				return `New ${model}`;

			case FORM_ACTIONS.update: {

				let text = name;

				if (differentiator) text += ` (${differentiator})`;

				return text;

			}

			default:
				return '';

		}

	})(formAction);

	const isNewInstance = formAction === FORM_ACTIONS.create;

	return (
		<PageTitle text={pageTitle} isNewInstance={isNewInstance} />
	);

};

withInstancePageTitle.propTypes = {
	name: PropTypes.string.isRequired,
	differentiator: PropTypes.string,
	model: PropTypes.string.isRequired,
	formAction: PropTypes.string.isRequired
};

export default withInstancePageTitle;
