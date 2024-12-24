import { createSlice } from '@reduxjs/toolkit';

const festivalSlice = createSlice({
	name: 'festival',
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
} = festivalSlice.actions;

export default festivalSlice.reducer;
