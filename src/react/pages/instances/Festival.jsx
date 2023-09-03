import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { FestivalForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../wrappers';

const Festival = props => {

	const { festival, festivalFormData } = props;

	return (
		<InstanceWrapper
			instance={festival}
			formAction={festivalFormData.action}
		>

			<FestivalForm
				instance={festivalFormData.instance || {}}
				action={festivalFormData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

Festival.propTypes = {
	festival: PropTypes.object.isRequired,
	festivalFormData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	festival: state.festival,
	festivalFormData: state.festivalFormData
});

export default connect(mapStateToProps)(Festival);
