import { useParams } from 'react-router';

import { useGetTimeQuery } from '../../../redux/slices/api.js';
import { TimeForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';

const Time = () => {
	const { uuid } = useParams();

	const { data = {} } = useGetTimeQuery(uuid);

	const { instance = {}, formData = {} } = data;

	return (
		<InstanceWrapper instance={instance} formAction={formData.action}>
			<TimeForm instance={formData.instance || {}} action={formData.action || 'Submit'} />
		</InstanceWrapper>
	);
};

export default Time;
