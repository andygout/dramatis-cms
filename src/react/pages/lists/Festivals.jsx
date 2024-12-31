import { ListWrapper } from '../../wrappers/index.js';
import { useGetFestivalsQuery } from '../../../redux/slices/api.js';

const Festivals = () => {

	const { data: festivals = [] } = useGetFestivalsQuery();

	return (
		<ListWrapper
			instances={festivals}
			pageTitleText='Festivals'
		>
		</ListWrapper>
	);

};

export default Festivals;
