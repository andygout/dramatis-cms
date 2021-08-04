import { Map } from 'immutable';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { AwardForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../utils';

class Award extends React.Component {

	render () {

		const { award, awardFormData } = this.props;

		return (
			<InstanceWrapper
				instance={award}
				formAction={awardFormData.get('action')}
			>

				<AwardForm
					instance={awardFormData.get('instance', Map())}
					action={awardFormData.get('action', 'Submit')}
					redirectPath={awardFormData.get('redirectPath')}
				/>

			</InstanceWrapper>
		);

	}

}

Award.propTypes = {
	award: ImmutablePropTypes.map.isRequired,
	awardFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	award: state.get('award'),
	awardFormData: state.get('awardFormData')
});

export default connect(mapStateToProps)(Award);
