import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { NOTIFICATION_STATUSES } from '../../utils/constants';

const Notification = props => {

	const { text, status } = props;

	const notificationClassName = classNames({
		'notification': true,
		'notification--success': status === NOTIFICATION_STATUSES.success,
		'notification--failure': status === NOTIFICATION_STATUSES.failure
	});

	return (
		<div className={notificationClassName}>
			{ text }
		</div>
	);

};

Notification.propTypes = {
	text: PropTypes.string.isRequired,
	status: PropTypes.string
};

export default Notification;
