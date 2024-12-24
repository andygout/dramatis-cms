import { createSlice } from '@reduxjs/toolkit';

const awardSlice = createSlice({
	name: 'award',
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
} = awardSlice.actions;

export default awardSlice.reducer;
