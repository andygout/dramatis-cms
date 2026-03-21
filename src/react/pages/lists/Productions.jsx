import { useGetProductionsQuery } from '../../../redux/slices/api.js';
import { ListWrapper } from '../../wrappers/index.js';

const Productions = () => {
	const { data: productions = [] } = useGetProductionsQuery();

	return <ListWrapper instances={productions} pageTitleText="Productions"></ListWrapper>;
};

export default Productions;
