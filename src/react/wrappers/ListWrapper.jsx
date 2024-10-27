import PropTypes from 'prop-types';

import { FormattedJson, PageTitle } from '../components/index.js';

const ListWrapper = props => {

	const { pageTitleText, instances } = props;

	return (
		<>

			<PageTitle text={pageTitleText} />

			<FormattedJson data={instances} />

		</>
	);

};

ListWrapper.propTypes = {
	pageTitleText: PropTypes.string.isRequired,
	instances: PropTypes.array.isRequired
};

export default ListWrapper;
