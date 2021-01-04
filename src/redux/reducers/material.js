import { Map, fromJS } from 'immutable';

import {
	REQUEST_MATERIAL,
	RECEIVE_MATERIAL,
	REQUEST_MATERIAL_CREATE,
	RECEIVE_MATERIAL_CREATE,
	REQUEST_MATERIAL_UPDATE,
	RECEIVE_MATERIAL_UPDATE,
	REQUEST_MATERIAL_DELETE,
	RECEIVE_MATERIAL_DELETE
} from '../utils/model-action-names';

const material = (state = Map(), action) => {

	switch (action.type) {

		case RECEIVE_MATERIAL:
		case RECEIVE_MATERIAL_CREATE:
		case RECEIVE_MATERIAL_UPDATE:
		case RECEIVE_MATERIAL_DELETE:
			return fromJS(action.payload);

		case REQUEST_MATERIAL:
		case REQUEST_MATERIAL_CREATE:
		case REQUEST_MATERIAL_UPDATE:
		case REQUEST_MATERIAL_DELETE:
		default:
			return state;

	}

};

export default material;
