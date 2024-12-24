import { createSlice } from '@reduxjs/toolkit';

const venueSlice = createSlice({
	name: 'venue',
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
} = venueSlice.actions;

export default venueSlice.reducer;
