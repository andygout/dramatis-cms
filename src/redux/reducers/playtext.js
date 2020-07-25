import { Map, fromJS } from 'immutable';

import {
	REQUEST_PLAYTEXT,
	RECEIVE_PLAYTEXT,
	REQUEST_PLAYTEXT_CREATE,
	RECEIVE_PLAYTEXT_CREATE,
	REQUEST_PLAYTEXT_UPDATE,
	RECEIVE_PLAYTEXT_UPDATE,
	REQUEST_PLAYTEXT_DELETE,
	RECEIVE_PLAYTEXT_DELETE
} from '../utils/model-action-names';

const playtext = (state = Map(), action) => {

	switch (action.type) {

		case RECEIVE_PLAYTEXT:
		case RECEIVE_PLAYTEXT_CREATE:
		case RECEIVE_PLAYTEXT_UPDATE:
		case RECEIVE_PLAYTEXT_DELETE:
			return fromJS(action.payload);

		case REQUEST_PLAYTEXT:
		case REQUEST_PLAYTEXT_CREATE:
		case REQUEST_PLAYTEXT_UPDATE:
		case REQUEST_PLAYTEXT_DELETE:
		default:
			return state;

	}

};

export default playtext;
