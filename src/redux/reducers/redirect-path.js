import {
	RECEIVE_REDIRECT_PATH,
	CANCEL_REDIRECT_PATH
} from '../utils/redirect-path-action-names';

const redirectPath = (state = null, action) => {

	switch (action.type) {

		case RECEIVE_REDIRECT_PATH:
			return action.payload;

		case CANCEL_REDIRECT_PATH:
			return null;

		default:
			return state;

	}

};

export default redirectPath;
