import { Map, fromJS } from 'immutable';

import {
	RECEIVE_MATERIAL_NEW_FORM_DATA,
	RECEIVE_MATERIAL_EDIT_FORM_DATA
} from '../utils/model-action-names';
import { FORM_ACTIONS } from '../../utils/constants';

const materialFormData = (state = Map(), action) => {

	switch (action.type) {

		case RECEIVE_MATERIAL_NEW_FORM_DATA:
			return fromJS({ ...action.payload, action: FORM_ACTIONS.create });

		case RECEIVE_MATERIAL_EDIT_FORM_DATA:
			return fromJS({ ...action.payload, action: FORM_ACTIONS.update });

		default:
			return state;

	}

};

export default materialFormData;
