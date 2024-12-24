import { createSlice } from '@reduxjs/toolkit';

const festivalSeriesSlice = createSlice({
	name: 'festivalSeries',
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
} = festivalSeriesSlice.actions;

export default festivalSeriesSlice.reducer;
