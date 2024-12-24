import { notificationDeactivated } from '../actions';

const deactivateNotification = () => async (dispatch, getState) => {

	if (getState().notification.isActive) {

		return dispatch(notificationDeactivated());

	}

};

export {
	deactivateNotification
};
