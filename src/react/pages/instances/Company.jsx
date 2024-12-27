import { useParams } from 'react-router-dom';

import { CompanyForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';
import { useGetCompanyQuery } from '../../../redux/slices/api.js';

const Company = () => {

	const { uuid } = useParams();

	const { data = {} } = useGetCompanyQuery(uuid);

	const { instance = {}, formData = {} } = data;

	return (
		<InstanceWrapper
			instance={instance}
			formAction={formData.action}
		>

			<CompanyForm
				instance={formData.instance || {}}
				action={formData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

export default Company;
