import { createSlice } from '@reduxjs/toolkit';

import { ACTIONS } from '../../utils/constants.js';

const festivalSeriesFormDataSlice = createSlice({
	name: 'festivalSeriesFormData',
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
} = festivalSeriesFormDataSlice.actions;

export default festivalSeriesFormDataSlice.reducer;
