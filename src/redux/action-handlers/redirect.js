import { redirectDeactivated } from '../actions';

const deactivateRedirect = () => async (dispatch, getState) => {

	if (getState().redirect.isActive) {

		return dispatch(redirectDeactivated());

	}

};

export {
	deactivateRedirect
};
