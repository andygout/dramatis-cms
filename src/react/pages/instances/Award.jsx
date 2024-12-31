import { useParams } from 'react-router-dom';

import { AwardForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';
import { useGetAwardQuery } from '../../../redux/slices/api.js';

const Award = () => {

	const { uuid } = useParams();

	const { data = {} } = useGetAwardQuery(uuid);

	const { instance = {}, formData = {} } = data;

	return (
		<InstanceWrapper
			instance={instance}
			formAction={formData.action}
		>

			<AwardForm
				instance={formData.instance || {}}
				action={formData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};
export default Award;
