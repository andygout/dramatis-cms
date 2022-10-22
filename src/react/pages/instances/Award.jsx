import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { AwardForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../wrappers';

const Award = props => {

	const { award, awardFormData } = props;

	return (
		<InstanceWrapper
			instance={award}
			formAction={awardFormData.action}
		>

			<AwardForm
				instance={awardFormData.instance || {}}
				action={awardFormData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

Award.propTypes = {
	award: PropTypes.object.isRequired,
	awardFormData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	award: state.award,
	awardFormData: state.awardFormData
});

export default connect(mapStateToProps)(Award);
