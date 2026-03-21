import { useGetVenuesQuery } from '../../../redux/slices/api.js';
import { ListWrapper } from '../../wrappers/index.js';

const Venues = () => {
	const { data: venues = [] } = useGetVenuesQuery();

	return <ListWrapper instances={venues} pageTitleText="Venues"></ListWrapper>;
};

export default Venues;
