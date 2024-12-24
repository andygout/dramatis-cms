import { createSlice } from '@reduxjs/toolkit';

import { ACTIONS } from '../../utils/constants.js';

const companyFormDataSlice = createSlice({
	name: 'companyFormData',
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
} = companyFormDataSlice.actions;

export default companyFormDataSlice.reducer;
