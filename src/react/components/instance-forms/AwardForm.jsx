import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { Fieldset, FormWrapper, InputAndErrors } from '../form/index.js';
import { handleChange } from '../../utils/form.js';
import {
	useCreateAwardMutation,
	useUpdateAwardMutation,
	useDeleteAwardMutation
} from '../../../redux/slices/api.js';

const AwardForm = props => {

	const { instance, action } = props;

	const [createAward] = useCreateAwardMutation();
	const [updateAward] = useUpdateAwardMutation();
	const [deleteAward] = useDeleteAwardMutation();

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
			createInstance={createAward}
			updateInstance={updateAward}
			deleteInstance={deleteAward}
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

AwardForm.propTypes = {
	action: PropTypes.string.isRequired,
	instance: PropTypes.object.isRequired
};

export default AwardForm;
