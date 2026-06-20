import { useParams } from 'react-router';

import { useGetLocaleQuery } from '../../../redux/slices/api.js';
import { LocaleForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';

const Locale = () => {
	const { uuid } = useParams();

	const { data = {} } = useGetLocaleQuery(uuid);

	const { instance = {}, formData = {} } = data;

	return (
		<InstanceWrapper instance={instance} formAction={formData.action}>
			<LocaleForm instance={formData.instance || {}} action={formData.action || 'Submit'} />
		</InstanceWrapper>
	);
};

export default Locale;
