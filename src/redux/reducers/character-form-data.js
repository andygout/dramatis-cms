import { Map, fromJS } from 'immutable';

import {
	RECEIVE_CHARACTER_NEW_FORM_DATA,
	RECEIVE_CHARACTER_EDIT_FORM_DATA
} from '../utils/model-action-names';
import { ACTIONS } from '../../utils/constants';

const characterFormData = (state = Map(), action) => {

	switch (action.type) {

		case RECEIVE_CHARACTER_NEW_FORM_DATA:
			return fromJS({ ...action.payload, action: ACTIONS.CREATE });

		case RECEIVE_CHARACTER_EDIT_FORM_DATA:
			return fromJS({ ...action.payload, action: ACTIONS.UPDATE });

		default:
			return state;

	}

};

export default characterFormData;
