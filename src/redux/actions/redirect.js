import { getIn } from '../../lib/object-interactions';
import createAction from './base';
import {
	ACTIVATE_REDIRECT,
	DEACTIVATE_REDIRECT
} from '../utils/redirect-action-names';

const activateRedirect = redirectData =>
	createAction(ACTIVATE_REDIRECT, { isActive: true, ...redirectData });

const deactivateRedirect = () => (dispatch, getState) => {

	if (getIn(getState(), ['redirect', 'isActive'])) {

		createAction(DEACTIVATE_REDIRECT, { isActive: false });

	}

};

export {
	activateRedirect,
	deactivateRedirect
};
