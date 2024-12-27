import { api } from '../slices/api.js';
import error from '../slices/error.js';
import notification from '../slices/notification.js';
import redirect from '../slices/redirect.js';

export default {
	[api.reducerPath]: api.reducer,
	error,
	notification,
	redirect
};
