import {
	REQUEST_PRODUCTION,
	RECEIVE_PRODUCTION,
	RECEIVE_PRODUCTION_UPDATE
} from '../utils/model-actions';

const production = (state = {}, action) => {

	switch (action.type) {

		case REQUEST_PRODUCTION:
			return state;

		case RECEIVE_PRODUCTION:
			return action.payload;

		case RECEIVE_PRODUCTION_UPDATE:
			return action.payload;

		default:
			return state;

	}

};

export default production;
