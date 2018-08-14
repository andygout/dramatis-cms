import React, { Component } from 'react';

import ContentHeader from '../components/content-header';
import FormattedJson from '../components/formatted-json';
import InstanceDocumentTitle from '../components/instance-document-title';
import PageTitle from '../components/page-title';

class InstanceWrapper extends Component {

	render () {

		const { props } = this;

		const { instance } = props;

		return (
			<React.Fragment>

				<InstanceDocumentTitle instance={instance} />

				<ContentHeader text={instance.model} />

				<PageTitle pageTitle={instance.name} />

				<FormattedJson data={instance} />

				{props.children}

			</React.Fragment>
		);

	};

};

export default InstanceWrapper;
