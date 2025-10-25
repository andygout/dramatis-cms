import { ACTIONS } from '../../utils/constants.js';

const withInstancePageTitle = PageTitle => {

	const InstancePageTitle = props => {

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

	return InstancePageTitle;

};

export default withInstancePageTitle;
