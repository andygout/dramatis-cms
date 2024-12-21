import { createSlice } from '@reduxjs/toolkit';

const initialState = { isActive: false };

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		notificationActivated (state, action) {

			return { isActive: true, ...action.payload };

		},
		notificationDeactivated (state) {

			return { isActive: false };

		}
	}
});

export const { notificationActivated, notificationDeactivated } = notificationSlice.actions;

export default notificationSlice.reducer;
