import { Map, fromJS } from 'immutable';

import {
	RECEIVE_PRODUCTION_NEW_FORM_DATA,
	RECEIVE_PRODUCTION_EDIT_FORM_DATA
} from '../utils/model-action-names';
import { ACTIONS } from '../../utils/constants';

const productionFormData = (state = Map(), action) => {

	switch (action.type) {

		case RECEIVE_PRODUCTION_NEW_FORM_DATA:
			return fromJS({ ...action.payload, action: ACTIONS.CREATE });

		case RECEIVE_PRODUCTION_EDIT_FORM_DATA:
			return fromJS({ ...action.payload, action: ACTIONS.UPDATE });

		default:
			return state;

	}

};

export default productionFormData;
