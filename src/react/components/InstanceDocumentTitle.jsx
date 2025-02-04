import { Helmet } from 'react-helmet';

import { ACTIONS } from '../../utils/constants.js';

const InstanceDocumentTitle = props => {

	const { name, modelDisplayName, differentiatorSuffix, formAction } = props;

	const documentTitle = (action => {

		switch (action) {

			case ACTIONS.CREATE:
				return `New ${modelDisplayName}`;

			case ACTIONS.UPDATE:
				return `Edit: ${name} (${modelDisplayName})${differentiatorSuffix}`;

		}

	})(formAction);

	return (
		<Helmet title={documentTitle} />
	);

};

export default InstanceDocumentTitle;
