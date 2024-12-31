import {
	activated as errorActivated,
	deactivated as errorDeactivated
} from '../slices/error.js';
import {
	activated as notificationActivated,
	deactivated as notificationDeactivated
} from '../slices/notification.js';
import {
	activated as redirectActivated,
	deactivated as redirectDeactivated
} from '../slices/redirect.js';

export {
	errorActivated,
	errorDeactivated,
	notificationActivated,
	notificationDeactivated,
	redirectActivated,
	redirectDeactivated
};
