import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { SeasonForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../wrappers';

const Season = props => {

	const { season, seasonFormData } = props;

	return (
		<InstanceWrapper
			instance={season}
			formAction={seasonFormData.action}
		>

			<SeasonForm
				instance={seasonFormData.instance || {}}
				action={seasonFormData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

Season.propTypes = {
	season: PropTypes.object.isRequired,
	seasonFormData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	season: state.season,
	seasonFormData: state.seasonFormData
});

export default connect(mapStateToProps)(Season);
