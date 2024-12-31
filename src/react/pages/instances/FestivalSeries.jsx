import { useParams } from 'react-router-dom';

import { FestivalSeriesForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';
import { useGetFestivalSeriesQuery } from '../../../redux/slices/api.js';

const FestivalSeries = () => {

	const { uuid } = useParams();

	const { data = {} } = useGetFestivalSeriesQuery(uuid);

	const { instance = {}, formData = {} } = data;

	return (
		<InstanceWrapper
			instance={instance}
			formAction={formData.action}
		>

			<FestivalSeriesForm
				instance={formData.instance || {}}
				action={formData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

export default FestivalSeries;
