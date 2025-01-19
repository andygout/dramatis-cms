import { useParams } from 'react-router';

import { VenueForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';
import { useGetVenueQuery } from '../../../redux/slices/api.js';

const Venue = () => {

	const { uuid } = useParams();

	const { data = {} } = useGetVenueQuery(uuid);

	const { instance = {}, formData = {} } = data;

	return (
		<InstanceWrapper
			instance={instance}
			formAction={formData.action}
		>

			<VenueForm
				instance={formData.instance || {}}
				action={formData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

export default Venue;
