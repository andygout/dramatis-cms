import { Map, fromJS } from 'immutable';

import {
	RECEIVE_PRODUCTION_NEW_FORM_DATA,
	RECEIVE_PRODUCTION_EDIT_FORM_DATA
} from '../utils/model-actions';
import { formActions } from '../../utils/constants';

const productionFormData = (state = Map({}), action) => {

	switch (action.type) {

		case RECEIVE_PRODUCTION_NEW_FORM_DATA:
			return fromJS({ ...action.payload, action: formActions.CREATE });

		case RECEIVE_PRODUCTION_EDIT_FORM_DATA:
			return fromJS({ ...action.payload, action: formActions.UPDATE });

		default:
			return state;

	}

};

export default productionFormData;
