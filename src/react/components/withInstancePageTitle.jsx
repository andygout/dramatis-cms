import PropTypes from 'prop-types';
import React from 'react';

import { FORM_ACTIONS } from '../../utils/constants';

const withInstancePageTitle = PageTitle => props => {

	const { name, model, formAction } = props;

	const text = (action => {

		switch (action) {

			case FORM_ACTIONS.create:
				return `New ${model}`;

			case FORM_ACTIONS.update:
				return name;

			default:
				return '';

		}

	})(formAction);

	const isNewInstance = formAction === FORM_ACTIONS.create;

	return (
		<PageTitle text={text} isNewInstance={isNewInstance} />
	);

};

withInstancePageTitle.propTypes = {
	name: PropTypes.string.isRequired,
	model: PropTypes.string.isRequired,
	formAction: PropTypes.string.isRequired
};

export default withInstancePageTitle;
