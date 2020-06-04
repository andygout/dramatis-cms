import { Map, fromJS } from 'immutable';

import {
	RECEIVE_PLAYTEXT_NEW_FORM_DATA,
	RECEIVE_PLAYTEXT_EDIT_FORM_DATA
} from '../utils/model-actions';
import { formActions } from '../../utils/constants';

const playtextFormData = (state = Map({}), action) => {

	switch (action.type) {

		case RECEIVE_PLAYTEXT_NEW_FORM_DATA:
			return fromJS({ ...action.payload, action: formActions.CREATE });

		case RECEIVE_PLAYTEXT_EDIT_FORM_DATA:
			return fromJS({ ...action.payload, action: formActions.UPDATE });

		default:
			return state;

	}

};

export default playtextFormData;
