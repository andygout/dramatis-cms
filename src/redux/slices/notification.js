import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
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
} = notificationSlice.actions;

export default notificationSlice.reducer;
