import createAction from './base';
import {
	RECEIVE_ERROR,
	CANCEL_ERROR
} from '../utils/error-action-names';

const receiveError = message => createAction(RECEIVE_ERROR, { isExistent: true, message });

const cancelError = () => (dispatch, getState) => {

	if (getState().getIn(['error', 'isExistent'])) {

		dispatch(createAction(CANCEL_ERROR, { isExistent: false }));

	}

};

export {
	receiveError,
	cancelError
};
