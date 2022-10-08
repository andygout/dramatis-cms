import {
	REQUEST_VENUE,
	RECEIVE_VENUE,
	REQUEST_VENUE_CREATE,
	RECEIVE_VENUE_CREATE,
	REQUEST_VENUE_UPDATE,
	RECEIVE_VENUE_UPDATE,
	REQUEST_VENUE_DELETE,
	RECEIVE_VENUE_DELETE
} from '../utils/model-action-names';

const venue = (state = {}, action) => {

	switch (action.type) {

		case RECEIVE_VENUE:
		case RECEIVE_VENUE_CREATE:
		case RECEIVE_VENUE_UPDATE:
		case RECEIVE_VENUE_DELETE:
			return action.payload;

		case REQUEST_VENUE:
		case REQUEST_VENUE_CREATE:
		case REQUEST_VENUE_UPDATE:
		case REQUEST_VENUE_DELETE:
		default:
			return state;

	}

};

export default venue;
