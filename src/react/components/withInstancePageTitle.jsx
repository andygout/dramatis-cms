import PropTypes from 'prop-types';
import React from 'react';

import { FORM_ACTIONS } from '../../utils/constants';

const withInstancePageTitle = PageTitle => props => {

	const { name, modelDisplayName, differentiatorSuffix, formAction } = props;

	const pageTitle = (action => {

		switch (action) {

			case FORM_ACTIONS.create:
				return `New ${modelDisplayName}`;

			case FORM_ACTIONS.update:
				return `${name}${differentiatorSuffix}`;

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
	modelDisplayName: PropTypes.string.isRequired,
	differentiatorSuffix: PropTypes.string,
	formAction: PropTypes.string.isRequired
};

export default withInstancePageTitle;
