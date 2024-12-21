import { createSlice } from '@reduxjs/toolkit';

const initialState = { isActive: false };

const errorSlice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		errorActivated (state, action) {

			return { isActive: true, ...action.payload };

		},
		errorDeactivated (state) {

			return { isActive: false };

		}
	}
});

export const { errorActivated, errorDeactivated } = errorSlice.actions;

export default errorSlice.reducer;
