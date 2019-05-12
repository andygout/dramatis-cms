import { Map, fromJS } from 'immutable';

import {
	REQUEST_PRODUCTION,
	RECEIVE_PRODUCTION,
	RECEIVE_PRODUCTION_UPDATE
} from '../utils/model-actions';

const production = (state = Map({}), action) => {

	switch (action.type) {

		case REQUEST_PRODUCTION:
			return state;

		case RECEIVE_PRODUCTION:
			return fromJS(action.payload);

		case RECEIVE_PRODUCTION_UPDATE:
			return fromJS(action.payload);

		default:
			return state;

	}

};

export default production;
