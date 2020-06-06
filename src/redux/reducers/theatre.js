import { Map, fromJS } from 'immutable';

import {
	REQUEST_THEATRE,
	RECEIVE_THEATRE,
	RECEIVE_THEATRE_TEMPLATE,
	RECEIVE_THEATRE_CREATE,
	RECEIVE_THEATRE_UPDATE
} from '../utils/model-actions';

const theatre = (state = Map({}), action) => {

	switch (action.type) {

		case RECEIVE_THEATRE_TEMPLATE:
		case RECEIVE_THEATRE_CREATE:
		case RECEIVE_THEATRE:
		case RECEIVE_THEATRE_UPDATE:
			return fromJS(action.payload);

		case REQUEST_THEATRE:
		default:
			return state;

	}

};

export default theatre;
