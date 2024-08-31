import PropTypes from 'prop-types';
import React from 'react';

import { ACTIONS } from '../../utils/constants.js';

const withInstancePageTitle = PageTitle => {

	const _InstancePageTitle = props => {

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

	_InstancePageTitle.propTypes = {
		name: PropTypes.string,
		modelDisplayName: PropTypes.string,
		differentiatorSuffix: PropTypes.string,
		formAction: PropTypes.string
	};

	return _InstancePageTitle;

};

export default withInstancePageTitle;
