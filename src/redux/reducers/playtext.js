import { Map, fromJS } from 'immutable';

import {
	REQUEST_PLAYTEXT,
	RECEIVE_PLAYTEXT,
	RECEIVE_PLAYTEXT_UPDATE
} from '../utils/model-actions';

const playtext = (state = Map({}), action) => {

	switch (action.type) {

		case REQUEST_PLAYTEXT:
			return state;

		case RECEIVE_PLAYTEXT:
			return fromJS(action.payload);

		case RECEIVE_PLAYTEXT_UPDATE:
			return fromJS(action.payload);

		default:
			return state;

	}

};

export default playtext;
