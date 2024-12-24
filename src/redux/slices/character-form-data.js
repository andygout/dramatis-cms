import { createSlice } from '@reduxjs/toolkit';

import { ACTIONS } from '../../utils/constants.js';

const characterFormDataSlice = createSlice({
	name: 'characterFormData',
	initialState: {},
	reducers: {
		newFormDataFetched (state, action) {

			return { action: ACTIONS.CREATE, ...action.payload };

		},
		editFormDataFetched (state, action) {

			return { action: ACTIONS.UPDATE, ...action.payload };

		}
	}
});

export const {
	newFormDataFetched,
	editFormDataFetched
} = characterFormDataSlice.actions;

export default characterFormDataSlice.reducer;
