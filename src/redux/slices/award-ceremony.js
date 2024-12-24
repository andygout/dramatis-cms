import { createSlice } from '@reduxjs/toolkit';

const awardCeremonySlice = createSlice({
	name: 'awardCeremony',
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
} = awardCeremonySlice.actions;

export default awardCeremonySlice.reducer;
