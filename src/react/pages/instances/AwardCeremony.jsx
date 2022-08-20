import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { AwardCeremonyForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../utils';

class AwardCeremony extends React.Component {

	render () {

		const { awardCeremony, awardCeremonyFormData } = this.props;

		return (
			<InstanceWrapper
				instance={awardCeremony}
				formAction={awardCeremonyFormData.get('action')}
			>

				<AwardCeremonyForm
					instance={awardCeremonyFormData.get('instance', new Map())}
					action={awardCeremonyFormData.get('action', 'Submit')}
					redirectPath={awardCeremonyFormData.get('redirectPath')}
				/>

			</InstanceWrapper>
		);

	}

}

AwardCeremony.propTypes = {
	awardCeremony: ImmutablePropTypes.map.isRequired,
	awardCeremonyFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	awardCeremony: state.get('awardCeremony'),
	awardCeremonyFormData: state.get('awardCeremonyFormData')
});

export default connect(mapStateToProps)(AwardCeremony);
