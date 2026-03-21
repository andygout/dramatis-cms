import { useGetMaterialsQuery } from '../../../redux/slices/api.js';
import { ListWrapper } from '../../wrappers/index.js';

const Materials = () => {
	const { data: materials = [] } = useGetMaterialsQuery();

	return <ListWrapper instances={materials} pageTitleText="Materials"></ListWrapper>;
};

export default Materials;
