import { createSlice } from '@reduxjs/toolkit';

const companySlice = createSlice({
	name: 'company',
	initialState: {},
	reducers: {
		fetched (state, action) {

			return action.payload;

		},
		created (state, action) {

			return action.payload;

		},
		updated (state, action) {

			return action.payload;

		},
		deleted (state, action) {

			return action.payload;

		}
	}
});

export const {
	fetched,
	created,
	updated,
	deleted
} = companySlice.actions;

export default companySlice.reducer;
