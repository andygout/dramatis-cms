import { useEffect, useState } from 'react';

import { Fieldset, FormWrapper, InputAndErrors } from '../form/index.js';
import { handleChange } from '../../utils/form.js';
import {
	useCreateCompanyMutation,
	useUpdateCompanyMutation,
	useDeleteCompanyMutation
} from '../../../redux/slices/api.js';

const CompanyForm = props => {

	const { instance, action } = props;

	const [createCompany] = useCreateCompanyMutation();
	const [updateCompany] = useUpdateCompanyMutation();
	const [deleteCompany] = useDeleteCompanyMutation();

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
			createInstance={createCompany}
			updateInstance={updateCompany}
			deleteInstance={deleteCompany}
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

export default CompanyForm;
