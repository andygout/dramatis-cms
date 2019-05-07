import {
	REQUEST_CHARACTER,
	RECEIVE_CHARACTER,
	RECEIVE_CHARACTER_UPDATE
} from '../utils/model-actions';

const character = (state = {}, action) => {

	switch (action.type) {

		case REQUEST_CHARACTER:
			return state;

		case RECEIVE_CHARACTER:
			return action.payload;

		case RECEIVE_CHARACTER_UPDATE:
			return action.payload;

		default:
			return state;

	}

};

export default character;
