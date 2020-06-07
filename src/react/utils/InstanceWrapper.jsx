import React from 'react';

import {
	ContentHeader,
	Form,
	FormattedJson,
	InstanceDocumentTitle,
	PageTitle,
	withInstancePageTitle
} from '../components';

export default class InstanceWrapper extends React.Component {

	render () {

		const { instance, formData, children } = this.props;

		const InstancePageTitle = withInstancePageTitle(PageTitle);

		return (
			<React.Fragment>

				<InstanceDocumentTitle
					name={instance.get('name')}
					model={instance.get('model')}
					formAction={formData.get('action')}
				/>

				<ContentHeader text={instance.get('model')}/>

				<InstancePageTitle
					name={instance.get('name')}
					model={instance.get('model')}
					formAction={formData.get('action')}
				/>

				<FormattedJson data={instance}/>

				<Form
					instance={formData.get('instance')}
					action={formData.get('action')}
					redirectToInstance={formData.get('redirectToInstance')}
				/>

				{children}

			</React.Fragment>
		);

	};

};
