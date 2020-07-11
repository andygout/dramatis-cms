import { Map, fromJS } from 'immutable';

import {
	REQUEST_PLAYTEXT,
	RECEIVE_PLAYTEXT,
	RECEIVE_PLAYTEXT_CREATE,
	RECEIVE_PLAYTEXT_UPDATE,
	RECEIVE_PLAYTEXT_DELETE
} from '../utils/model-actions';

const playtext = (state = Map({}), action) => {

	switch (action.type) {

		case RECEIVE_PLAYTEXT:
		case RECEIVE_PLAYTEXT_CREATE:
		case RECEIVE_PLAYTEXT_UPDATE:
		case RECEIVE_PLAYTEXT_DELETE:
			return fromJS(action.payload);

		case REQUEST_PLAYTEXT:
		default:
			return state;

	}

};

export default playtext;
