import { Map } from 'immutable';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import {
	Form,
	FormattedJson,
	InstanceDocumentTitle,
	InstanceLabel,
	PageTitle,
	withInstancePageTitle
} from '../components';

class InstanceWrapper extends React.Component {

	render () {

		const { instance, formData } = this.props;

		const InstancePageTitle = withInstancePageTitle(PageTitle);

		return (
			<React.Fragment>

				{
					instance.get('name') && instance.get('model') && formData.get('action') && (
						<InstanceDocumentTitle
							name={instance.get('name')}
							model={instance.get('model')}
							formAction={formData.get('action')}
						/>
					)
				}

				<InstanceLabel text={instance.get('model', '')} />

				<InstancePageTitle
					name={instance.get('name')}
					model={instance.get('model')}
					formAction={formData.get('action')}
				/>

				<FormattedJson data={instance} />

				<Form
					instance={formData.get('instance', Map())}
					action={formData.get('action', 'Submit')}
					redirectPath={formData.get('redirectPath')}
				/>

			</React.Fragment>
		);

	}

}

InstanceWrapper.propTypes = {
	instance: ImmutablePropTypes.map.isRequired,
	formData: ImmutablePropTypes.map.isRequired
};

export default InstanceWrapper;
