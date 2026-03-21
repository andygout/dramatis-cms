import { useGetSeasonsQuery } from '../../../redux/slices/api.js';
import { ListWrapper } from '../../wrappers/index.js';

const Seasons = () => {
	const { data: seasons = [] } = useGetSeasonsQuery();

	return <ListWrapper instances={seasons} pageTitleText="Seasons"></ListWrapper>;
};

export default Seasons;
