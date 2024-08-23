import {
	REQUEST_SEASON,
	RECEIVE_SEASON,
	REQUEST_SEASON_CREATE,
	RECEIVE_SEASON_CREATE,
	REQUEST_SEASON_UPDATE,
	RECEIVE_SEASON_UPDATE,
	REQUEST_SEASON_DELETE,
	RECEIVE_SEASON_DELETE
} from '../utils/model-action-names.js';

const season = (state = {}, action) => {

	switch (action.type) {

		case RECEIVE_SEASON:
		case RECEIVE_SEASON_CREATE:
		case RECEIVE_SEASON_UPDATE:
		case RECEIVE_SEASON_DELETE:
			return action.payload;

		case REQUEST_SEASON:
		case REQUEST_SEASON_CREATE:
		case REQUEST_SEASON_UPDATE:
		case REQUEST_SEASON_DELETE:
		default:
			return state;

	}

};

export default season;
