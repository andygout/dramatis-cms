import PropTypes from 'prop-types';
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

InstanceDocumentTitle.propTypes = {
	name: PropTypes.string.isRequired,
	modelDisplayName: PropTypes.string.isRequired,
	differentiatorSuffix: PropTypes.string,
	formAction: PropTypes.string.isRequired
};

export default InstanceDocumentTitle;
