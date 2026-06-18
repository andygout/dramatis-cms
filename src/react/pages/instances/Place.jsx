import { useParams } from 'react-router';

import { useGetPlaceQuery } from '../../../redux/slices/api.js';
import { PlaceForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';

const Place = () => {
	const { uuid } = useParams();

	const { data = {} } = useGetPlaceQuery(uuid);

	const { instance = {}, formData = {} } = data;

	return (
		<InstanceWrapper instance={instance} formAction={formData.action}>
			<PlaceForm instance={formData.instance || {}} action={formData.action || 'Submit'} />
		</InstanceWrapper>
	);
};

export default Place;
