import { useGetLocalesQuery } from '../../../redux/slices/api.js';
import { ListWrapper } from '../../wrappers/index.js';

const Locales = () => {
	const { data: Locales = [] } = useGetLocalesQuery();

	return <ListWrapper instances={Locales} pageTitleText="Locales"></ListWrapper>;
};

export default Locales;
