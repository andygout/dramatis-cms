import { Map, fromJS } from 'immutable';

import {
	REQUEST_AWARD,
	RECEIVE_AWARD,
	REQUEST_AWARD_CREATE,
	RECEIVE_AWARD_CREATE,
	REQUEST_AWARD_UPDATE,
	RECEIVE_AWARD_UPDATE,
	REQUEST_AWARD_DELETE,
	RECEIVE_AWARD_DELETE
} from '../utils/model-action-names';

const award = (state = Map(), action) => {

	switch (action.type) {

		case RECEIVE_AWARD:
		case RECEIVE_AWARD_CREATE:
		case RECEIVE_AWARD_UPDATE:
		case RECEIVE_AWARD_DELETE:
			return fromJS(action.payload);

		case REQUEST_AWARD:
		case REQUEST_AWARD_CREATE:
		case REQUEST_AWARD_UPDATE:
		case REQUEST_AWARD_DELETE:
		default:
			return state;

	}

};

export default award;
