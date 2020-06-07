import { Map, fromJS } from 'immutable';

import {
	RECEIVE_CHARACTER_NEW_FORM_DATA,
	RECEIVE_CHARACTER_EDIT_FORM_DATA
} from '../utils/model-actions';
import { FORM_ACTIONS } from '../../utils/constants';

const characterFormData = (state = Map({}), action) => {

	switch (action.type) {

		case RECEIVE_CHARACTER_NEW_FORM_DATA:
			return fromJS({ ...action.payload, action: FORM_ACTIONS.create });

		case RECEIVE_CHARACTER_EDIT_FORM_DATA:
			return fromJS({ ...action.payload, action: FORM_ACTIONS.update });

		default:
			return state;

	}

};

export default characterFormData;
