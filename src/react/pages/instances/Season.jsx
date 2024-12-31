import { useParams } from 'react-router-dom';

import { SeasonForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';
import { useGetSeasonQuery } from '../../../redux/slices/api.js';

const Season = () => {

	const { uuid } = useParams();

	const { data = {} } = useGetSeasonQuery(uuid);

	const { instance = {}, formData = {} } = data;

	return (
		<InstanceWrapper
			instance={instance}
			formAction={formData.action}
		>

			<SeasonForm
				instance={formData.instance || {}}
				action={formData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

export default Season;
