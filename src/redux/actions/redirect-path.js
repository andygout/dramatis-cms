import createAction from './base';
import {
	RECEIVE_REDIRECT_PATH,
	CANCEL_REDIRECT_PATH
} from '../utils/redirect-path-action-names';

const receiveRedirectPath = redirectPath => createAction(RECEIVE_REDIRECT_PATH, redirectPath);

const cancelRedirectPath = () => createAction(CANCEL_REDIRECT_PATH);

export {
	receiveRedirectPath,
	cancelRedirectPath
};
