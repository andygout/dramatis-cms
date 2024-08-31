import {
	REQUEST_COMPANY,
	RECEIVE_COMPANY,
	REQUEST_COMPANY_CREATE,
	RECEIVE_COMPANY_CREATE,
	REQUEST_COMPANY_UPDATE,
	RECEIVE_COMPANY_UPDATE,
	REQUEST_COMPANY_DELETE,
	RECEIVE_COMPANY_DELETE
} from '../utils/model-action-names.js';

const company = (state = {}, action) => {

	switch (action.type) {

		case RECEIVE_COMPANY:
		case RECEIVE_COMPANY_CREATE:
		case RECEIVE_COMPANY_UPDATE:
		case RECEIVE_COMPANY_DELETE:
			return action.payload;

		case REQUEST_COMPANY:
		case REQUEST_COMPANY_CREATE:
		case REQUEST_COMPANY_UPDATE:
		case REQUEST_COMPANY_DELETE:
		default:
			return state;

	}

};

export default company;
