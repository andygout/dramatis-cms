import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { AwardCeremonyForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../utils';

const AwardCeremony = props => {

	const { awardCeremony, awardCeremonyFormData } = props;

	return (
		<InstanceWrapper
			instance={awardCeremony}
			formAction={awardCeremonyFormData.get('action')}
		>

			<AwardCeremonyForm
				instance={awardCeremonyFormData.get('instance', new Map())}
				action={awardCeremonyFormData.get('action', 'Submit')}
			/>

		</InstanceWrapper>
	);

};

AwardCeremony.propTypes = {
	awardCeremony: ImmutablePropTypes.map.isRequired,
	awardCeremonyFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	awardCeremony: state.get('awardCeremony'),
	awardCeremonyFormData: state.get('awardCeremonyFormData')
});

export default connect(mapStateToProps)(AwardCeremony);
