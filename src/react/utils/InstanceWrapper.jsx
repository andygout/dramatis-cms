import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Redirect } from 'react-router-dom';

import getDifferentiatorSuffix from '../../lib/get-differentiator-suffix';
import {
	FormattedJson,
	InstanceDocumentTitle,
	InstanceLabel,
	PageTitle,
	withInstancePageTitle
} from '../components';
import { getRedirectToProps } from './FormUtils';
import { MODEL_TO_DISPLAY_NAME_MAP } from '../../utils/constants';

const InstanceWrapper = props => {

	const { instance, formAction, redirectPath, children } = props;

	if (redirectPath) return <Redirect to={getRedirectToProps(redirectPath, instance.get('model'))} />;

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

};

InstanceWrapper.propTypes = {
	instance: ImmutablePropTypes.map.isRequired,
	formAction: PropTypes.string,
	redirectPath: PropTypes.string,
	children: PropTypes.node.isRequired
};

export default InstanceWrapper;
