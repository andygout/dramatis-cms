import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { VenueForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';

const Venue = props => {

	const { venue, venueFormData } = props;

	return (
		<InstanceWrapper
			instance={venue}
			formAction={venueFormData.action}
		>

			<VenueForm
				instance={venueFormData.instance || {}}
				action={venueFormData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

Venue.propTypes = {
	venue: PropTypes.object.isRequired,
	venueFormData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	venue: state.venue,
	venueFormData: state.venueFormData
});

export default connect(mapStateToProps)(Venue);
