import React from 'react';

import { FormattedJson, PageTitle } from '../components';

export default class ListWrapper extends React.Component {

	render () {

		const { pageTitleText, instances, children } = this.props;

		return (
			<React.Fragment>

				<PageTitle text={pageTitleText} />

				<FormattedJson data={instances} />

				{ children }

			</React.Fragment>
		);

	};

};
