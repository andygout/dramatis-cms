import getDocumentTitle from '../../lib/get-document-title.js';
import { ACTIONS } from '../../utils/constants.js';

const InstanceDocumentTitle = props => {

	const { name, modelDisplayName, differentiatorSuffix, formAction } = props;

	const pageTitle = (action => {

		switch (action) {

			case ACTIONS.CREATE:
				return `New ${modelDisplayName}`;

			case ACTIONS.UPDATE:
				return `Edit: ${name} (${modelDisplayName})${differentiatorSuffix}`;

		}

	})(formAction);

	const documentTitle = getDocumentTitle(pageTitle);

	return (
		<title>{documentTitle}</title>
	);

};

export default InstanceDocumentTitle;
