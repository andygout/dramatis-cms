import { createSlice } from '@reduxjs/toolkit';

import { ACTIONS } from '../../utils/constants.js';

const festivalFormDataSlice = createSlice({
	name: 'festivalFormData',
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
} = festivalFormDataSlice.actions;

export default festivalFormDataSlice.reducer;
