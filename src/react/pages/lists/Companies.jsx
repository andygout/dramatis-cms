import { useGetCompaniesQuery } from '../../../redux/slices/api.js';
import { ListWrapper } from '../../wrappers/index.js';

const Companies = () => {
	const { data: companies = [] } = useGetCompaniesQuery();

	return <ListWrapper instances={companies} pageTitleText="Companies"></ListWrapper>;
};

export default Companies;
