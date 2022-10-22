import PropTypes from 'prop-types';
import React from 'react';

import { FormattedJson, PageTitle } from '../components';

const ListWrapper = props => {

	const { pageTitleText, instances } = props;

	return (
		<React.Fragment>

			<PageTitle text={pageTitleText} />

			<FormattedJson data={instances} />

		</React.Fragment>
	);

};

ListWrapper.propTypes = {
	pageTitleText: PropTypes.string.isRequired,
	instances: PropTypes.array.isRequired
};

export default ListWrapper;
