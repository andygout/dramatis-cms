import { useGetFestivalsQuery } from '../../../redux/slices/api.js';
import { ListWrapper } from '../../wrappers/index.js';

const Festivals = () => {
	const { data: festivals = [] } = useGetFestivalsQuery();

	return <ListWrapper instances={festivals} pageTitleText="Festivals"></ListWrapper>;
};

export default Festivals;
