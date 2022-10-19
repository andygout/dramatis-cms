import {
	ACTIVATE_REDIRECT,
	DEACTIVATE_REDIRECT
} from '../utils/redirect-action-names';

const redirect = (state = { isActive: false }, action) => {

	switch (action.type) {

		case ACTIVATE_REDIRECT:
		case DEACTIVATE_REDIRECT:
			return action.payload;

		default:
			return state;

	}

};

export default redirect;
