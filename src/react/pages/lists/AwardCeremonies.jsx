import { useGetAwardCeremoniesQuery } from '../../../redux/slices/api.js';
import { ListWrapper } from '../../wrappers/index.js';

const AwardCeremonies = () => {
	const { data: awardCeremonies = [] } = useGetAwardCeremoniesQuery();

	return <ListWrapper instances={awardCeremonies} pageTitleText="Award ceremonies"></ListWrapper>;
};

export default AwardCeremonies;
