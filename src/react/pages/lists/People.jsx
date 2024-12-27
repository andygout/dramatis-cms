import { ListWrapper } from '../../wrappers/index.js';
import { useGetPeopleQuery } from '../../../redux/slices/api.js';

const People = () => {

	const { data: people = [] } = useGetPeopleQuery();

	return (
		<ListWrapper
			instances={people}
			pageTitleText='People'
		>
		</ListWrapper>
	);

};

export default People;
