import { Map, fromJS } from 'immutable';

import {
	RECEIVE_PRODUCTION_NEW_FORM_DATA,
	RECEIVE_PRODUCTION_EDIT_FORM_DATA
} from '../utils/model-actions';
import { FORM_ACTIONS } from '../../utils/constants';

const productionFormData = (state = Map({}), action) => {

	switch (action.type) {

		case RECEIVE_PRODUCTION_NEW_FORM_DATA:
			return fromJS({ ...action.payload, action: FORM_ACTIONS.create });

		case RECEIVE_PRODUCTION_EDIT_FORM_DATA:
			return fromJS({ ...action.payload, action: FORM_ACTIONS.update });

		default:
			return state;

	}

};

export default productionFormData;
