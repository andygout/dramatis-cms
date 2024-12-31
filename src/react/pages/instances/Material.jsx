import { useParams } from 'react-router-dom';

import { MaterialForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';
import { useGetMaterialQuery } from '../../../redux/slices/api.js';

const Material = () => {

	const { uuid } = useParams();

	const { data = {} } = useGetMaterialQuery(uuid);

	const { instance = {}, formData = {} } = data;

	return (
		<InstanceWrapper
			instance={instance}
			formAction={formData.action}
		>

			<MaterialForm
				instance={formData.instance || {}}
				action={formData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

export default Material;
