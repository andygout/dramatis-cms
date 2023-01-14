import createAction from './base';
import {
	ACTIVATE_NOTIFICATION,
	DEACTIVATE_NOTIFICATION
} from '../utils/notification-action-names';

const activateNotification = notificationData =>
	createAction(ACTIVATE_NOTIFICATION, { isActive: true, ...notificationData });

const deactivateNotification = () => (dispatch, getState) => {

	if (getState().notification.isActive) {

		dispatch(createAction(DEACTIVATE_NOTIFICATION, { isActive: false }));

	}

};

export {
	activateNotification,
	deactivateNotification
};
