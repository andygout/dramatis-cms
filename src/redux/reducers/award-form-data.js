import { Map, fromJS } from 'immutable';

import {
	RECEIVE_AWARD_NEW_FORM_DATA,
	RECEIVE_AWARD_EDIT_FORM_DATA
} from '../utils/model-action-names';
import { ACTIONS } from '../../utils/constants';

const awardFormData = (state = Map(), action) => {

	switch (action.type) {

		case RECEIVE_AWARD_NEW_FORM_DATA:
			return fromJS({ ...action.payload, action: ACTIONS.CREATE });

		case RECEIVE_AWARD_EDIT_FORM_DATA:
			return fromJS({ ...action.payload, action: ACTIONS.UPDATE });

		default:
			return state;

	}

};

export default awardFormData;
