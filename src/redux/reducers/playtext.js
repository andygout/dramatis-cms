import { Map, fromJS } from 'immutable';

import {
	REQUEST_PLAYTEXT,
	RECEIVE_PLAYTEXT,
	RECEIVE_PLAYTEXT_TEMPLATE,
	RECEIVE_PLAYTEXT_CREATE,
	RECEIVE_PLAYTEXT_UPDATE
} from '../utils/model-actions';

const playtext = (state = Map({}), action) => {

	switch (action.type) {

		case RECEIVE_PLAYTEXT_TEMPLATE:
		case RECEIVE_PLAYTEXT_CREATE:
		case RECEIVE_PLAYTEXT:
		case RECEIVE_PLAYTEXT_UPDATE:
			return fromJS(action.payload);

		case REQUEST_PLAYTEXT:
		default:
			return state;

	}

};

export default playtext;
