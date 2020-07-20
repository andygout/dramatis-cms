import { Map, fromJS } from 'immutable';

import {
	ACTIVATE_NOTIFICATION,
	DEACTIVATE_NOTIFICATION
} from '../utils/notification-action-names.js';

const notification = (state = Map({}), action) => {

	switch (action.type) {

		case ACTIVATE_NOTIFICATION:
		case DEACTIVATE_NOTIFICATION:
			return fromJS(action.payload);

		default:
			return state;

	}

};

export default notification;
