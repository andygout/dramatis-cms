import React, { Component } from 'react';

import FormattedJson from '../components/formatted-json';
import PageTitle from '../components/page-title';

class ListWrapper extends Component {

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
