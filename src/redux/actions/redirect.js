import createAction from './base';
import {
	RECEIVE_REDIRECT,
	CANCEL_REDIRECT
} from '../utils/redirect-action-names';

const receiveRedirect = redirectData => createAction(RECEIVE_REDIRECT, redirectData);

const cancelRedirect = () => (dispatch, getState) => {

	if (getState().getIn(['redirect', 'isActive'])) {

		dispatch(createAction(CANCEL_REDIRECT, { isActive: false }));

	}

};

export {
	receiveRedirect,
	cancelRedirect
};
