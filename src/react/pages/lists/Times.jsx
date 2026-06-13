import { useGetTimesQuery } from '../../../redux/slices/api.js';
import { ListWrapper } from '../../wrappers/index.js';

const Times = () => {
	const { data: Times = [] } = useGetTimesQuery();

	return <ListWrapper instances={Times} pageTitleText="Times"></ListWrapper>;
};

export default Times;
