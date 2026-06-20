import { useEffect, useState } from 'react';

import {
	useCreateLocaleMutation,
	useUpdateLocaleMutation,
	useDeleteLocaleMutation
} from '../../../redux/slices/api.js';
import { handleChange } from '../../utils/form.js';
import { Fieldset, FormWrapper, InputAndErrors } from '../form/index.js';

const LocaleForm = (props) => {
	const { instance, action } = props;

	const [createLocale] = useCreateLocaleMutation();
	const [updateLocale] = useUpdateLocaleMutation();
	const [deleteLocale] = useDeleteLocaleMutation();

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
			createInstance={createLocale}
			updateInstance={updateLocale}
			deleteInstance={deleteLocale}
		>
			<Fieldset header={'Name'}>
				<InputAndErrors
					value={name}
					errors={errors?.name}
					handleChange={(event) => handleChange(name, setName, [], event)}
				/>
			</Fieldset>

			<Fieldset header={'Differentiator'}>
				<InputAndErrors
					value={differentiator}
					errors={errors?.differentiator}
					handleChange={(event) => handleChange(differentiator, setDifferentiator, [], event)}
				/>
			</Fieldset>
		</FormWrapper>
	);
};

export default LocaleForm;
