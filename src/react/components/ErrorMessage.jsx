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

export default ErrorMessage;
