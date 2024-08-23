import {
	REQUEST_FESTIVAL,
	RECEIVE_FESTIVAL,
	REQUEST_FESTIVAL_CREATE,
	RECEIVE_FESTIVAL_CREATE,
	REQUEST_FESTIVAL_UPDATE,
	RECEIVE_FESTIVAL_UPDATE,
	REQUEST_FESTIVAL_DELETE,
	RECEIVE_FESTIVAL_DELETE
} from '../utils/model-action-names.js';

const festival = (state = {}, action) => {

	switch (action.type) {

		case RECEIVE_FESTIVAL:
		case RECEIVE_FESTIVAL_CREATE:
		case RECEIVE_FESTIVAL_UPDATE:
		case RECEIVE_FESTIVAL_DELETE:
			return action.payload;

		case REQUEST_FESTIVAL:
		case REQUEST_FESTIVAL_CREATE:
		case REQUEST_FESTIVAL_UPDATE:
		case REQUEST_FESTIVAL_DELETE:
		default:
			return state;

	}

};

export default festival;
