import React from 'react';

import { ContentHeader, Form, FormattedJson, InstanceDocumentTitle, PageTitle } from '../components';

class InstanceWrapper extends React.Component {

	render () {

		const { instance, children } = this.props;

		return (
			<React.Fragment>

				<InstanceDocumentTitle instance={instance}/>

				<ContentHeader text={instance.get('model')}/>

				<PageTitle text={instance.get('name')} model={instance.get('model')}/>

				<FormattedJson data={instance}/>

				<Form />

				{children}

			</React.Fragment>
		);

	};

};

export default InstanceWrapper;
