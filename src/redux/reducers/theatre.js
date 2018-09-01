import {
	REQUEST_THEATRE,
	RECEIVE_THEATRE,
	RECEIVE_THEATRE_UPDATE
} from '../utils/model-actions';

const theatre = (state = {}, action) => {

	switch (action.type) {

		case REQUEST_THEATRE:
			return state;

		case RECEIVE_THEATRE:
			return action.payload;

		case RECEIVE_THEATRE_UPDATE:
			return action.payload;

		default:
			return state;

	}

};

export default theatre;
