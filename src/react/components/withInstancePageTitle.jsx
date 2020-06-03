import React from 'react';

import { formActions } from '../../utils/constants';

const withInstancePageTitle = PageTitle => props => {

	const { name, model, formAction } = props;

	const text = (action => {

		switch (action) {

			case formActions.CREATE:
				return `New ${model}`;

			case formActions.UPDATE:
				return name;

			default:
				return '';

		}

	})(formAction);

	const isNewInstance = formAction === formActions.CREATE;

	return (
		<PageTitle text={text} isNewInstance={isNewInstance} />
	);

};

export default withInstancePageTitle;
