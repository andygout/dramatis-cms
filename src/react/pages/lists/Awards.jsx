import { ListWrapper } from '../../wrappers/index.js';
import { useGetAwardsQuery } from '../../../redux/slices/api.js';

const Awards = () => {

	const { data: awards = [] } = useGetAwardsQuery();

	return (
		<ListWrapper
			instances={awards}
			pageTitleText='Awards'
		>
		</ListWrapper>
	);

};

export default Awards;
