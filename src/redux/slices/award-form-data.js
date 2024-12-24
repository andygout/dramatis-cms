import { createSlice } from '@reduxjs/toolkit';

import { ACTIONS } from '../../utils/constants.js';

const awardFormDataSlice = createSlice({
	name: 'awardFormData',
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
} = awardFormDataSlice.actions;

export default awardFormDataSlice.reducer;
