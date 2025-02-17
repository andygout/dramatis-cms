import { ACTIONS } from '../../utils/constants.js';

const withInstancePageTitle = PageTitle => {

	const _InstancePageTitle = props => { // eslint-disable-line no-underscore-dangle

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

	return _InstancePageTitle;

};

export default withInstancePageTitle;
