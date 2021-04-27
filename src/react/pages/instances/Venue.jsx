import { Map } from 'immutable';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { VenueForm } from '../../components/instance-forms';
import { InstanceWrapper } from '../../utils';

class Venue extends React.Component {

	render () {

		const { venue, venueFormData } = this.props;

		return (
			<InstanceWrapper
				instance={venue}
				formAction={venueFormData.get('action')}
			>

				<VenueForm
					instance={venueFormData.get('instance', Map())}
					action={venueFormData.get('action', 'Submit')}
					redirectPath={venueFormData.get('redirectPath')}
				/>

			</InstanceWrapper>
		);

	}

}

Venue.propTypes = {
	venue: ImmutablePropTypes.map.isRequired,
	venueFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	venue: state.get('venue'),
	venueFormData: state.get('venueFormData')
});

export default connect(mapStateToProps)(Venue);
