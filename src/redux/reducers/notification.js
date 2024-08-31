import {
	ACTIVATE_NOTIFICATION,
	DEACTIVATE_NOTIFICATION
} from '../utils/notification-action-names.js';

const notification = (state = { isActive: false }, action) => {

	switch (action.type) {

		case ACTIVATE_NOTIFICATION:
		case DEACTIVATE_NOTIFICATION:
			return action.payload;

		default:
			return state;

	}

};

export default notification;
