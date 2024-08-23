import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import PageTitle from './PageTitle.jsx';

const ErrorMessage = props => {

	const { errorText } = props;

	return (
		<div>

			<Helmet title={errorText} />

			<PageTitle text={errorText} />

		</div>
	);

};

ErrorMessage.propTypes = {
	errorText: PropTypes.string.isRequired
};

export default ErrorMessage;
