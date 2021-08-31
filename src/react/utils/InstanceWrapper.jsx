import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';

import getDifferentiatorSuffix from '../../lib/get-differentiator-suffix';
import {
	FormattedJson,
	InstanceDocumentTitle,
	InstanceLabel,
	PageTitle,
	withInstancePageTitle
} from '../components';
import { MODEL_TO_DISPLAY_NAME_MAP } from '../../utils/constants';

class InstanceWrapper extends React.Component {

	render () {

		const { instance, formAction, children } = this.props;

		const InstancePageTitle = withInstancePageTitle(PageTitle);

		const name = instance.get('name');

		const modelDisplayName = MODEL_TO_DISPLAY_NAME_MAP[instance.get('model')];

		const differentiatorSuffix = getDifferentiatorSuffix(instance.get('differentiator'));

		return (
			<React.Fragment>

				{
					name && modelDisplayName && formAction && (
						<InstanceDocumentTitle
							name={name}
							modelDisplayName={modelDisplayName}
							differentiatorSuffix={differentiatorSuffix}
							formAction={formAction}
						/>
					)
				}

				<InstanceLabel model={instance.get('model', '')} />

				<InstancePageTitle
					name={name}
					modelDisplayName={modelDisplayName}
					differentiatorSuffix={differentiatorSuffix}
					formAction={formAction}
				/>

				<FormattedJson data={instance} />

				{ children }

			</React.Fragment>
		);

	}

}

InstanceWrapper.propTypes = {
	instance: PropTypes.instanceOf(Map).isRequired,
	formAction: PropTypes.string,
	children: PropTypes.node.isRequired
};

export default InstanceWrapper;
