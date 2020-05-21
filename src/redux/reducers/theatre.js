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

		case REQUEST_THEATRE:
			return state;

		case RECEIVE_THEATRE_TEMPLATE:
			return fromJS(action.payload);

		case RECEIVE_THEATRE_CREATE:
			return fromJS(action.payload);

		case RECEIVE_THEATRE:
			return fromJS(action.payload);

		case RECEIVE_THEATRE_UPDATE:
			return fromJS(action.payload);

		default:
			return state;

	}

};

export default theatre;
