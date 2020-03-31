import React from 'react';

import ContentHeader from '../components/ContentHeader';
import Form from '../components/form/Form';
import FormattedJson from '../components/FormattedJson';
import InstanceDocumentTitle from '../components/InstanceDocumentTitle';
import PageTitle from '../components/PageTitle';

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
