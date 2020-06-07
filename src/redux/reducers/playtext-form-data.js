import { Map, fromJS } from 'immutable';

import {
	RECEIVE_PLAYTEXT_NEW_FORM_DATA,
	RECEIVE_PLAYTEXT_EDIT_FORM_DATA
} from '../utils/model-actions';
import { FORM_ACTIONS } from '../../utils/constants';

const playtextFormData = (state = Map({}), action) => {

	switch (action.type) {

		case RECEIVE_PLAYTEXT_NEW_FORM_DATA:
			return fromJS({ ...action.payload, action: FORM_ACTIONS.create });

		case RECEIVE_PLAYTEXT_EDIT_FORM_DATA:
			return fromJS({ ...action.payload, action: FORM_ACTIONS.update });

		default:
			return state;

	}

};

export default playtextFormData;
