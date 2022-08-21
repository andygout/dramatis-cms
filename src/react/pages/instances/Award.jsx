import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { AwardForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../utils';

const Award = props => {

	const { award, awardFormData } = props;

	return (
		<InstanceWrapper
			instance={award}
			formAction={awardFormData.get('action')}
			redirectPath={awardFormData.get('redirectPath')}
		>

			<AwardForm
				instance={awardFormData.get('instance', new Map())}
				action={awardFormData.get('action', 'Submit')}
			/>

		</InstanceWrapper>
	);

};

Award.propTypes = {
	award: ImmutablePropTypes.map.isRequired,
	awardFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	award: state.get('award'),
	awardFormData: state.get('awardFormData')
});

export default connect(mapStateToProps)(Award);
