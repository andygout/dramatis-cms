import React from 'react';

import { FormattedJson, PageTitle } from '../components';

class ListWrapper extends React.Component {

	render () {

		const { pageTitleText, instances, children } = this.props;

		return (
			<React.Fragment>

				<PageTitle text={pageTitleText}/>

				<FormattedJson data={instances}/>

				{children}

			</React.Fragment>
		);

	};

};

export default ListWrapper;
