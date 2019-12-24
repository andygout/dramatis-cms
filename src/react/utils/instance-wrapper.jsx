import React from 'react';

import ContentHeader from '../components/content-header';
import Form from '../components/form/form';
import FormattedJson from '../components/formatted-json';
import InstanceDocumentTitle from '../components/instance-document-title';
import PageTitle from '../components/page-title';

class InstanceWrapper extends React.Component {

	render () {

		const { instance, children } = this.props;

		return (
			<React.Fragment>

				<InstanceDocumentTitle instance={instance}/>

				<ContentHeader text={instance.get('model')}/>

				<PageTitle text={instance.get('name')}/>

				<FormattedJson data={instance}/>

				<Form />

				{children}

			</React.Fragment>
		);

	};

};

export default InstanceWrapper;
