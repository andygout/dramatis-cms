import createAction from './base';
import {
	ACTIVATE_NOTIFICATION,
	DEACTIVATE_NOTIFICATION
} from '../utils/notification-action-names.js';

const activateNotification = notification => createAction(ACTIVATE_NOTIFICATION, notification);

const deactivateNotification = () => (dispatch, getState) => {

	if (getState().getIn(['notification', 'isActive'])) {

		dispatch(createAction(DEACTIVATE_NOTIFICATION, { isActive: false }));

	}

}

export {
	activateNotification,
	deactivateNotification
};
