import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { Fieldset, FormWrapper, InputAndErrors } from '../form/index.js';
import { handleChange } from '../../utils/form.js';
import {
	useCreateFestivalSeriesMutation,
	useUpdateFestivalSeriesMutation,
	useDeleteFestivalSeriesMutation
} from '../../../redux/slices/api.js';

const FestivalSeriesForm = props => {

	const { instance, action } = props;

	const [createFestivalSeries] = useCreateFestivalSeriesMutation();
	const [updateFestivalSeries] = useUpdateFestivalSeriesMutation();
	const [deleteFestivalSeries] = useDeleteFestivalSeriesMutation();

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
			createInstance={createFestivalSeries}
			updateInstance={updateFestivalSeries}
			deleteInstance={deleteFestivalSeries}
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

FestivalSeriesForm.propTypes = {
	action: PropTypes.string.isRequired,
	instance: PropTypes.object.isRequired
};

export default FestivalSeriesForm;
