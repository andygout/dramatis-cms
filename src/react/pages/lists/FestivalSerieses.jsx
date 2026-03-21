import { useGetFestivalSeriesesQuery } from '../../../redux/slices/api.js';
import { ListWrapper } from '../../wrappers/index.js';

const FestivalSerieses = () => {
	const { data: festivalSerieses = [] } = useGetFestivalSeriesesQuery();

	return <ListWrapper instances={festivalSerieses} pageTitleText="Festival serieses"></ListWrapper>;
};

export default FestivalSerieses;
