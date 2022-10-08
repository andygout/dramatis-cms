import {
	RECEIVE_REDIRECT,
	CANCEL_REDIRECT
} from '../utils/redirect-action-names';

const redirect = (state = { isActive: false }, action) => {

	switch (action.type) {

		case RECEIVE_REDIRECT:
		case CANCEL_REDIRECT:
			return action.payload;

		default:
			return state;

	}

};

export default redirect;
