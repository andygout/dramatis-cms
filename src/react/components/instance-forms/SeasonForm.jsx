import { useEffect, useState } from 'react';

import { Fieldset, FormWrapper, InputAndErrors } from '../form/index.js';
import { handleChange } from '../../utils/form.js';
import {
	useCreateSeasonMutation,
	useUpdateSeasonMutation,
	useDeleteSeasonMutation
} from '../../../redux/slices/api.js';

const SeasonForm = props => {

	const { instance, action } = props;

	const [createSeason] = useCreateSeasonMutation();
	const [updateSeason] = useUpdateSeasonMutation();
	const [deleteSeason] = useDeleteSeasonMutation();

	const [name, setName] = useState(instance.name);
	const [differentiator, setDifferentiator] = useState(instance.differentiator);
	const [errors, setErrors] = useState(instance.errors);

	useEffect(() => {
		setName(instance.name);
		setDifferentiator(instance.differentiator);
		setErrors(instance.errors);
	}, [instance]);

	const actionableInstance = {
		model: instance.model,
		uuid: instance.uuid,
		name,
		differentiator
	};

	return (
		<FormWrapper
			action={action}
			instance={actionableInstance}
			createInstance={createSeason}
			updateInstance={updateSeason}
			deleteInstance={deleteSeason}
		>

			<Fieldset header={'Name'}>

				<InputAndErrors
					value={name}
					errors={errors?.name}
					handleChange={event => handleChange(name, setName, [], event)}
				/>

			</Fieldset>

			<Fieldset header={'Differentiator'}>

				<InputAndErrors
					value={differentiator}
					errors={errors?.differentiator}
					handleChange={event => handleChange(differentiator, setDifferentiator, [], event)}
				/>

			</Fieldset>

		</FormWrapper>
	);

};

export default SeasonForm;
