import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
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
	venue: PropTypes.instanceOf(Map).isRequired,
	venueFormData: PropTypes.instanceOf(Map).isRequired
};

const mapStateToProps = state => ({
	venue: state.get('venue'),
	venueFormData: state.get('venueFormData')
});

export default connect(mapStateToProps)(Venue);
