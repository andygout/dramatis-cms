import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import {
	FormattedJson,
	InstanceDocumentTitle,
	InstanceLabel,
	PageTitle,
	withInstancePageTitle
} from '../components';

class InstanceWrapper extends React.Component {

	render () {

		const { instance, formAction, children } = this.props;

		const InstancePageTitle = withInstancePageTitle(PageTitle);

		return (
			<React.Fragment>

				{
					instance.get('name') && instance.get('model') && formAction && (
						<InstanceDocumentTitle
							name={instance.get('name')}
							differentiator={instance.get('differentiator')}
							model={instance.get('model')}
							formAction={formAction}
						/>
					)
				}

				<InstanceLabel text={instance.get('model', '')} />

				<InstancePageTitle
					name={instance.get('name')}
					differentiator={instance.get('differentiator')}
					model={instance.get('model')}
					formAction={formAction}
				/>

				<FormattedJson data={instance} />

				{ children }

			</React.Fragment>
		);

	}

}

InstanceWrapper.propTypes = {
	instance: ImmutablePropTypes.map.isRequired,
	formAction: PropTypes.string,
	children: PropTypes.node.isRequired
};

export default InstanceWrapper;
