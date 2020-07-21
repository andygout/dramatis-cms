import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import {
	ContentHeader,
	Form,
	FormattedJson,
	InstanceDocumentTitle,
	PageTitle,
	withInstancePageTitle
} from '../components';

class InstanceWrapper extends React.Component {

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

				<ContentHeader text={instance.get('model')} />

				<InstancePageTitle
					name={instance.get('name')}
					model={instance.get('model')}
					formAction={formData.get('action')}
				/>

				<FormattedJson data={instance} />

				<Form
					instance={formData.get('instance')}
					action={formData.get('action')}
					redirectPath={formData.get('redirectPath')}
				/>

				{ children }

			</React.Fragment>
		);

	}

}

InstanceWrapper.propTypes = {
	instance: ImmutablePropTypes.map.isRequired,
	formData: ImmutablePropTypes.map.isRequired,
	children: PropTypes.node
};

export default InstanceWrapper;
