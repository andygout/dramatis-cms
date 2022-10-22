import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { AwardCeremonyForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../wrappers';

const AwardCeremony = props => {

	const { awardCeremony, awardCeremonyFormData } = props;

	return (
		<InstanceWrapper
			instance={awardCeremony}
			formAction={awardCeremonyFormData.action}
		>

			<AwardCeremonyForm
				instance={awardCeremonyFormData.instance || {}}
				action={awardCeremonyFormData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

AwardCeremony.propTypes = {
	awardCeremony: PropTypes.object.isRequired,
	awardCeremonyFormData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	awardCeremony: state.awardCeremony,
	awardCeremonyFormData: state.awardCeremonyFormData
});

export default connect(mapStateToProps)(AwardCeremony);
