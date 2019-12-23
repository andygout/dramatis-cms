import { Map, fromJS } from 'immutable';

import {
	RECEIVE_FORM_DATA
} from '../utils/model-actions';

const formData = (state = Map({}), action) => {

	switch (action.type) {

		case RECEIVE_FORM_DATA:
			return fromJS(action.payload);

		default:
			return state;

	}

};

export default formData;
