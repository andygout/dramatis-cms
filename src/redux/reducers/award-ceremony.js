import { Map, OrderedMap } from 'immutable';

import {
	REQUEST_AWARD_CEREMONY,
	RECEIVE_AWARD_CEREMONY,
	REQUEST_AWARD_CEREMONY_CREATE,
	RECEIVE_AWARD_CEREMONY_CREATE,
	REQUEST_AWARD_CEREMONY_UPDATE,
	RECEIVE_AWARD_CEREMONY_UPDATE,
	REQUEST_AWARD_CEREMONY_DELETE,
	RECEIVE_AWARD_CEREMONY_DELETE
} from '../utils/model-action-names';

const awardCeremony = (state = Map(), action) => {

	switch (action.type) {

		case RECEIVE_AWARD_CEREMONY:
		case RECEIVE_AWARD_CEREMONY_CREATE:
		case RECEIVE_AWARD_CEREMONY_UPDATE:
		case RECEIVE_AWARD_CEREMONY_DELETE:
			return OrderedMap(action.payload);

		case REQUEST_AWARD_CEREMONY:
		case REQUEST_AWARD_CEREMONY_CREATE:
		case REQUEST_AWARD_CEREMONY_UPDATE:
		case REQUEST_AWARD_CEREMONY_DELETE:
		default:
			return state;

	}

};

export default awardCeremony;
