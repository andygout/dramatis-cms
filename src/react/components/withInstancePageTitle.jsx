import React from 'react';

import { FORM_ACTIONS } from '../../utils/constants';

export default function (PageTitle) {

	return function (props) {

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

		const isNewInstance = formAction === FORM_ACTIONS.create

		return (
			<PageTitle text={text} isNewInstance={isNewInstance} />
		);

	};

};
