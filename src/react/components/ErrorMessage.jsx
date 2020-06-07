import React from 'react';
import { Helmet } from 'react-helmet';

import PageTitle from './PageTitle';

export default function (props) {

	const { errorText } = props;

	return (
		<div>

			<Helmet title={errorText} />

			<PageTitle text={errorText} />

		</div>
	);

};
