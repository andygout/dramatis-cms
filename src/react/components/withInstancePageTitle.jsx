import PropTypes from 'prop-types';
import React from 'react';

import { ACTIONS } from '../../utils/constants';

const withInstancePageTitle = PageTitle => props => {

	const { name, modelDisplayName, differentiatorSuffix, formAction } = props;

	const pageTitle = (action => {

		switch (action) {

			case ACTIONS.CREATE:
				return `New ${modelDisplayName}`;

			case ACTIONS.UPDATE:
				return `${name}${differentiatorSuffix}`;

			default:
				return '';

		}

	})(formAction);

	const isNewInstance = formAction === ACTIONS.CREATE;

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
