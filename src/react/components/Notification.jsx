import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { NOTIFICATION_STATUSES } from '../../utils/constants.js';

const Notification = props => {

	const { text, status } = props;

	const className = classNames({
		'notification': true,
		'notification--success': status === NOTIFICATION_STATUSES.success,
		'notification--failure': status === NOTIFICATION_STATUSES.failure
	});

	return (
		<div className={className}>
			{ text }
		</div>
	);

};

Notification.propTypes = {
	text: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired
};

export default Notification;
