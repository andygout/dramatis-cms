import { useParams } from 'react-router';

import { ProductionForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';
import { useGetProductionQuery } from '../../../redux/slices/api.js';

const Production = () => {

	const { uuid } = useParams();

	const { data = {} } = useGetProductionQuery(uuid);

	const { instance = {}, formData = {} } = data;

	return (
		<InstanceWrapper
			instance={instance}
			formAction={formData.action}
		>

			<ProductionForm
				instance={formData.instance || {}}
				action={formData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

export default Production;
