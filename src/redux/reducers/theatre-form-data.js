import { Map, fromJS } from 'immutable';

import {
	RECEIVE_THEATRE_NEW_FORM_DATA,
	RECEIVE_THEATRE_EDIT_FORM_DATA
} from '../utils/model-actions';
import { FORM_ACTIONS } from '../../utils/constants';

const theatreFormData = (state = Map({}), action) => {

	switch (action.type) {

		case RECEIVE_THEATRE_NEW_FORM_DATA:
			return fromJS({ ...action.payload, action: FORM_ACTIONS.create });

		case RECEIVE_THEATRE_EDIT_FORM_DATA:
			return fromJS({ ...action.payload, action: FORM_ACTIONS.update });

		default:
			return state;

	}

};

export default theatreFormData;
