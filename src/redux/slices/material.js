import { createSlice } from '@reduxjs/toolkit';

const materialSlice = createSlice({
	name: 'material',
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
} = materialSlice.actions;

export default materialSlice.reducer;
