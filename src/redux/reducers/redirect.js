import { Map, fromJS } from 'immutable';

import {
	RECEIVE_REDIRECT,
	CANCEL_REDIRECT
} from '../utils/redirect-action-names';

const redirect = (state = Map({ isActive: false }), action) => {

	switch (action.type) {

		case RECEIVE_REDIRECT:
		case CANCEL_REDIRECT:
			return fromJS(action.payload);

		default:
			return state;

	}

};

export default redirect;
