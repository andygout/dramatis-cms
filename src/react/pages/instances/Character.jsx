import { useParams } from 'react-router-dom';

import { CharacterForm } from '../../components/instance-forms/index.js';
import { InstanceWrapper } from '../../wrappers/index.js';
import { useGetCharacterQuery } from '../../../redux/slices/api.js';

const Character = () => {

	const { uuid } = useParams();

	const { data = {} } = useGetCharacterQuery(uuid);

	const { instance = {}, formData = {} } = data;

	return (
		<InstanceWrapper
			instance={instance}
			formAction={formData.action}
		>

			<CharacterForm
				instance={formData.instance || {}}
				action={formData.action || 'Submit'}
			/>

		</InstanceWrapper>
	);

};

export default Character;
