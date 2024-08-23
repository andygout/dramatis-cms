import {
	RECEIVE_SEASON_NEW_FORM_DATA,
	RECEIVE_SEASON_EDIT_FORM_DATA
} from '../utils/model-action-names.js';
import { ACTIONS } from '../../utils/constants.js';

const seasonFormData = (state = {}, action) => {

	switch (action.type) {

		case RECEIVE_SEASON_NEW_FORM_DATA:
			return { ...action.payload, action: ACTIONS.CREATE };

		case RECEIVE_SEASON_EDIT_FORM_DATA:
			return { ...action.payload, action: ACTIONS.UPDATE };

		default:
			return state;

	}

};

export default seasonFormData;
