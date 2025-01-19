import { useParams } from 'react-router';

import { FestivalForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';
import { useGetFestivalQuery } from '../../../redux/slices/api.js';

const Festival = () => {

	const { uuid } = useParams();

	const { data = {} } = useGetFestivalQuery(uuid);

	const { instance = {}, formData = {} } = data;

	return (
		<InstanceWrapper
			instance={instance}
			formAction={formData.action}
		>

			<FestivalForm
				instance={formData.instance || {}}
				action={formData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

export default Festival;
