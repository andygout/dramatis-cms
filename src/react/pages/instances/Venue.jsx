import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { VenueForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../utils';

const Venue = props => {

	const { venue, venueFormData } = props;

	return (
		<InstanceWrapper
			instance={venue}
			formAction={venueFormData.get('action')}
		>

			<VenueForm
				instance={venueFormData.get('instance', new Map())}
				action={venueFormData.get('action', 'Submit')}
			/>

		</InstanceWrapper>
	);

};

Venue.propTypes = {
	venue: ImmutablePropTypes.map.isRequired,
	venueFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	venue: state.get('venue'),
	venueFormData: state.get('venueFormData')
});

export default connect(mapStateToProps)(Venue);
