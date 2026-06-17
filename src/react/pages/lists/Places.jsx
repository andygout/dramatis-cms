import { useGetPlacesQuery } from '../../../redux/slices/api.js';
import { ListWrapper } from '../../wrappers/index.js';

const Places = () => {
	const { data: Places = [] } = useGetPlacesQuery();

	return <ListWrapper instances={Places} pageTitleText="Places"></ListWrapper>;
};

export default Places;
