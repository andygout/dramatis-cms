import { Map, fromJS } from 'immutable';

import {
	REQUEST_PRODUCTION,
	RECEIVE_PRODUCTION,
	RECEIVE_PRODUCTION_CREATE,
	RECEIVE_PRODUCTION_UPDATE,
	RECEIVE_PRODUCTION_DELETE
} from '../utils/model-actions';

const production = (state = Map({}), action) => {

	switch (action.type) {

		case RECEIVE_PRODUCTION:
		case RECEIVE_PRODUCTION_CREATE:
		case RECEIVE_PRODUCTION_UPDATE:
		case RECEIVE_PRODUCTION_DELETE:
			return fromJS(action.payload);

		case REQUEST_PRODUCTION:
		default:
			return state;

	}

};

export default production;
