import { useEffect, useState } from 'react';

import { useCreatePlaceMutation, useUpdatePlaceMutation, useDeletePlaceMutation } from '../../../redux/slices/api.js';
import { handleChange } from '../../utils/form.js';
import { Fieldset, FieldsetComponent, FormWrapper, InputAndErrors } from '../form/index.js';

const PlaceForm = (props) => {
	const { instance, action } = props;

	const [createPlace] = useCreatePlaceMutation();
	const [updatePlace] = useUpdatePlaceMutation();
	const [deletePlace] = useDeletePlaceMutation();

	const [name, setName] = useState(instance.name);
	const [differentiator, setDifferentiator] = useState(instance.differentiator);
	const [minLatitude, setMinLatitude] = useState(instance.minLatitude);
	const [maxLatitude, setMaxLatitude] = useState(instance.maxLatitude);
	const [minLongitude, setMinLongitude] = useState(instance.minLongitude);
	const [maxLongitude, setMaxLongitude] = useState(instance.maxLongitude);
	const [errors, setErrors] = useState(instance.errors);

	useEffect(() => {
		setName(instance.name);
		setDifferentiator(instance.differentiator);
		setMinLatitude(instance.minLatitude);
		setMaxLatitude(instance.maxLatitude);
		setMinLongitude(instance.minLongitude);
		setMaxLongitude(instance.maxLongitude);
		setErrors(instance.errors);
	}, [instance]);

	const actionableInstance = {
		model: instance.model,
		uuid: instance.uuid,
		name,
		differentiator,
		minLatitude: minLatitude === null ? null : Number(minLatitude),
		maxLatitude: maxLatitude === null ? null : Number(maxLatitude),
		minLongitude: minLongitude === null ? null : Number(minLongitude),
		maxLongitude: maxLongitude === null ? null : Number(maxLongitude)
	};

	return (
		<FormWrapper
			action={action}
			instance={actionableInstance}
			createInstance={createPlace}
			updateInstance={updatePlace}
			deleteInstance={deletePlace}
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

			<Fieldset header={'Bounding box coordinates'}>
				<FieldsetComponent fieldId={'min-latitude'} label={'Minimum latitude'}>
					<InputAndErrors
						type={'number'}
						value={minLatitude}
						errors={errors?.minLatitude}
						handleChange={(event) => handleChange(minLatitude, setMinLatitude, [], event)}
					/>
				</FieldsetComponent>

				<FieldsetComponent fieldId={'max-latitude'} label={'Maximum latitude'}>
					<InputAndErrors
						type={'number'}
						value={maxLatitude}
						errors={errors?.maxLatitude}
						handleChange={(event) => handleChange(maxLatitude, setMaxLatitude, [], event)}
					/>
				</FieldsetComponent>

				<FieldsetComponent fieldId={'min-longitude'} label={'Minimum longitude'}>
					<InputAndErrors
						type={'number'}
						value={minLongitude}
						errors={errors?.minLongitude}
						handleChange={(event) => handleChange(minLongitude, setMinLongitude, [], event)}
					/>
				</FieldsetComponent>

				<FieldsetComponent fieldId={'max-longitude'} label={'Maximum longitude'}>
					<InputAndErrors
						type={'number'}
						value={maxLongitude}
						errors={errors?.maxLongitude}
						handleChange={(event) => handleChange(maxLongitude, setMaxLongitude, [], event)}
					/>
				</FieldsetComponent>
			</Fieldset>
		</FormWrapper>
	);
};

export default PlaceForm;
