import { ListWrapper } from '../../wrappers/index.js';
import { useGetProductionsQuery } from '../../../redux/slices/api.js';

const Productions = () => {

	const { data: productions = [] } = useGetProductionsQuery();

	return (
		<ListWrapper
			instances={productions}
			pageTitleText='Productions'
		>
		</ListWrapper>
	);

};

export default Productions;
