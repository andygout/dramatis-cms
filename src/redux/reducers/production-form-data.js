import {
	RECEIVE_PRODUCTION_NEW_FORM_DATA,
	RECEIVE_PRODUCTION_EDIT_FORM_DATA
} from '../utils/model-action-names.js';
import { ACTIONS } from '../../utils/constants.js';

const productionFormData = (state = {}, action) => {

	switch (action.type) {

		case RECEIVE_PRODUCTION_NEW_FORM_DATA:
			return { ...action.payload, action: ACTIONS.CREATE };

		case RECEIVE_PRODUCTION_EDIT_FORM_DATA:
			return { ...action.payload, action: ACTIONS.UPDATE };

		default:
			return state;

	}

};

export default productionFormData;
