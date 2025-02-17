import { FormattedJson, PageTitle } from '../components/index.js';

const ListWrapper = props => {

	const { pageTitleText, instances } = props;

	return (
		<>

			<PageTitle text={pageTitleText} />

			<FormattedJson data={instances} />

		</>
	);

};

export default ListWrapper;
