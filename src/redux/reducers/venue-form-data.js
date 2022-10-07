import {
	RECEIVE_VENUE_NEW_FORM_DATA,
	RECEIVE_VENUE_EDIT_FORM_DATA
} from '../utils/model-action-names';
import { ACTIONS } from '../../utils/constants';

const venueFormData = (state = {}, action) => {

	switch (action.type) {

		case RECEIVE_VENUE_NEW_FORM_DATA:
			return { ...action.payload, action: ACTIONS.CREATE };

		case RECEIVE_VENUE_EDIT_FORM_DATA:
			return { ...action.payload, action: ACTIONS.UPDATE };

		default:
			return state;

	}

};

export default venueFormData;
