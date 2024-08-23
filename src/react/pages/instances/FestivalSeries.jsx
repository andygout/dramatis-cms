import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { FestivalSeriesForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';

const FestivalSeries = props => {

	const { festivalSeries, festivalSeriesFormData } = props;

	return (
		<InstanceWrapper
			instance={festivalSeries}
			formAction={festivalSeriesFormData.action}
		>

			<FestivalSeriesForm
				instance={festivalSeriesFormData.instance || {}}
				action={festivalSeriesFormData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

FestivalSeries.propTypes = {
	festivalSeries: PropTypes.object.isRequired,
	festivalSeriesFormData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	festivalSeries: state.festivalSeries,
	festivalSeriesFormData: state.festivalSeriesFormData
});

export default connect(mapStateToProps)(FestivalSeries);
