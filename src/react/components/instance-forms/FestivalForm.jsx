import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { Fieldset, FieldsetComponent, FormWrapper, InputAndErrors } from '../form/index.js';
import { handleChange } from '../../utils/form.js';
import {
	useCreateFestivalMutation,
	useUpdateFestivalMutation,
	useDeleteFestivalMutation
} from '../../../redux/slices/api.js';

const FestivalForm = props => {

	const { instance, action } = props;

	const [createFestival] = useCreateFestivalMutation();
	const [updateFestival] = useUpdateFestivalMutation();
	const [deleteFestival] = useDeleteFestivalMutation();

	const [name, setName] = useState(instance.name);
	const [differentiator, setDifferentiator] = useState(instance.differentiator);
	const [festivalSeries, setFestivalSeries] = useState(instance.festivalSeries);
	const [errors, setErrors] = useState(instance.errors);

	useEffect(() => {
		setName(instance.name);
		setDifferentiator(instance.differentiator);
		setFestivalSeries(instance.festivalSeries);
		setErrors(instance.errors);
	}, [instance]);

	const actionableInstance = {
		model: instance.model,
		uuid: instance.uuid,
		name,
		differentiator,
		festivalSeries
	};

	return (
		<FormWrapper
			action={action}
			instance={actionableInstance}
			createInstance={createFestival}
			updateInstance={updateFestival}
			deleteInstance={deleteFestival}
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

			<Fieldset header={'Festival series'}>

				<FieldsetComponent label={'Name'}>

					<InputAndErrors
						value={festivalSeries?.name}
						errors={festivalSeries?.errors.name}
						handleChange={event => handleChange(festivalSeries, setFestivalSeries, ['name'], event)}
					/>

				</FieldsetComponent>

				<FieldsetComponent label={'Differentiator'}>

					<InputAndErrors
						value={festivalSeries?.differentiator}
						errors={festivalSeries?.errors.differentiator}
						handleChange={event => handleChange(festivalSeries, setFestivalSeries, ['differentiator'], event)}
					/>

				</FieldsetComponent>

			</Fieldset>

		</FormWrapper>
	);

};

FestivalForm.propTypes = {
	action: PropTypes.string.isRequired,
	instance: PropTypes.object.isRequired
};

export default FestivalForm;
