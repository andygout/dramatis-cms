import { useParams } from 'react-router';

import { PersonForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';
import { useGetPersonQuery } from '../../../redux/slices/api.js';

const Person = () => {

	const { uuid } = useParams();

	const { data = {} } = useGetPersonQuery(uuid);

	const { instance = {}, formData = {} } = data;

	return (
		<InstanceWrapper
			instance={instance}
			formAction={formData.action}
		>

			<PersonForm
				instance={formData.instance || {}}
				action={formData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

export default Person;
