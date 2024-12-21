import { createSlice } from '@reduxjs/toolkit';

const redirectSlice = createSlice({
	name: 'redirect',
	initialState: { isActive: false },
	reducers: {
		activated (state, action) {

			return { isActive: true, ...action.payload };

		},
		deactivated () {

			return { isActive: false };

		}
	}
});

export const {
	activated,
	deactivated
} = redirectSlice.actions;

export default redirectSlice.reducer;
