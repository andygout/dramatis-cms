import PropTypes from 'prop-types';
import React from 'react';

import getDifferentiatorSuffix from '../../lib/get-differentiator-suffix.js';
import {
	FormattedJson,
	InstanceDocumentTitle,
	InstanceLabel,
	PageTitle,
	withInstancePageTitle
} from '../components/index.js';
import { MODEL_TO_DISPLAY_NAME_MAP } from '../../utils/constants.js';

const InstanceWrapper = props => {

	const { instance, formAction, children } = props;

	const InstancePageTitle = withInstancePageTitle(PageTitle);

	const name = instance.name;

	const modelDisplayName = MODEL_TO_DISPLAY_NAME_MAP[instance.model];

	const differentiatorSuffix = getDifferentiatorSuffix(instance.differentiator);

	return (
		<>

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

			<InstanceLabel model={instance.model || ''} />

			<InstancePageTitle
				name={name}
				modelDisplayName={modelDisplayName}
				differentiatorSuffix={differentiatorSuffix}
				formAction={formAction}
			/>

			<FormattedJson data={instance} />

			{ children }

		</>
	);

};

InstanceWrapper.propTypes = {
	instance: PropTypes.object.isRequired,
	formAction: PropTypes.string,
	children: PropTypes.node.isRequired
};

export default InstanceWrapper;
