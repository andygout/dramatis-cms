import createAction from './base';

const ACTIVATE_NOTIFICATION = 'ACTIVATE_NOTIFICATION';
const DEACTIVATE_NOTIFICATION = 'DEACTIVATE_NOTIFICATION';

const activateNotification = notification => createAction(ACTIVATE_NOTIFICATION, notification);

const deactivateNotification = () => (dispatch, getState) => {

	if (getState().getIn(['notification', 'isActive'])) {

		dispatch(createAction(DEACTIVATE_NOTIFICATION, { isActive: false }));

	}

}

export {
	ACTIVATE_NOTIFICATION,
	DEACTIVATE_NOTIFICATION,
	activateNotification,
	deactivateNotification
};
