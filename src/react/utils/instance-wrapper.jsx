import React from 'react';

import ContentHeader from '../components/content-header';
import Form from '../components/form';
import FormattedJson from '../components/formatted-json';
import InstanceDocumentTitle from '../components/instance-document-title';
import PageTitle from '../components/page-title';

class InstanceWrapper extends React.Component {

	render () {

		const { instance, children } = this.props;

		return (
			<React.Fragment>

				<InstanceDocumentTitle instance={instance}/>

				<ContentHeader text={instance.model}/>

				<PageTitle text={instance.name}/>

				<FormattedJson data={instance}/>

				<Form instance={instance}/>

				{children}

			</React.Fragment>
		);

	};

};

export default InstanceWrapper;
