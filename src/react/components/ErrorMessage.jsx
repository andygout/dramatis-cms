import getDocumentTitle from '../../lib/get-document-title.js';
import PageTitle from './PageTitle.jsx';

const ErrorMessage = props => {

	const { errorText } = props;

	const documentTitle = getDocumentTitle(errorText);

	return (
		<div>

			<title>{documentTitle}</title>

			<PageTitle text={errorText} />

		</div>
	);

};

export default ErrorMessage;
