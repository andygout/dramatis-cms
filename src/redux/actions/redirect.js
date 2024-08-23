import createAction from './base.js';
import {
	ACTIVATE_REDIRECT,
	DEACTIVATE_REDIRECT
} from '../utils/redirect-action-names.js';

const activateRedirect = redirectData =>
	createAction(ACTIVATE_REDIRECT, { isActive: true, ...redirectData });

const deactivateRedirect = () => (dispatch, getState) => {

	if (getState().redirect.isActive) {

		dispatch(createAction(DEACTIVATE_REDIRECT, { isActive: false }));

	}

};

export {
	activateRedirect,
	deactivateRedirect
};
