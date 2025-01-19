import { useParams } from 'react-router';

import { AwardCeremonyForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';
import { useGetAwardCeremonyQuery } from '../../../redux/slices/api.js';

const AwardCeremony = () => {

	const { uuid } = useParams();

	const { data = {} } = useGetAwardCeremonyQuery(uuid);

	const { instance = {}, formData = {} } = data;

	return (
		<InstanceWrapper
			instance={instance}
			formAction={formData.action}
		>

			<AwardCeremonyForm
				instance={formData.instance || {}}
				action={formData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

export default AwardCeremony;
