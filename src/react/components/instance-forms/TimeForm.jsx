import { useEffect, useState } from 'react';

import { useCreateTimeMutation, useUpdateTimeMutation, useDeleteTimeMutation } from '../../../redux/slices/api.js';
import { handleChange } from '../../utils/form.js';
import { Fieldset, FieldsetComponent, FormWrapper, InputAndErrors } from '../form/index.js';

const TimeForm = (props) => {
	const { instance, action } = props;

	const [createTime] = useCreateTimeMutation();
	const [updateTime] = useUpdateTimeMutation();
	const [deleteTime] = useDeleteTimeMutation();

	const [name, setName] = useState(instance.name);
	const [differentiator, setDifferentiator] = useState(instance.differentiator);
	const [fromDate, setFromDate] = useState(instance.fromDate);
	const [toDate, setToDate] = useState(instance.toDate);
	const [errors, setErrors] = useState(instance.errors);

	useEffect(() => {
		setName(instance.name);
		setDifferentiator(instance.differentiator);
		setFromDate(instance.fromDate);
		setToDate(instance.toDate);
		setErrors(instance.errors);
	}, [instance]);

	const actionableInstance = {
		model: instance.model,
		uuid: instance.uuid,
		name,
		differentiator,
		fromDate,
		toDate
	};

	return (
		<FormWrapper
			action={action}
			instance={actionableInstance}
			createInstance={createTime}
			updateInstance={updateTime}
			deleteInstance={deleteTime}
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

			<Fieldset header={'Dates'}>
				<FieldsetComponent label={'From'}>
					<InputAndErrors
						type={'date'}
						value={fromDate}
						errors={errors?.fromDate}
						handleChange={(event) => handleChange(fromDate, setFromDate, [], event)}
					/>
				</FieldsetComponent>

				<FieldsetComponent label={'To'}>
					<InputAndErrors
						type={'date'}
						value={toDate}
						errors={errors?.toDate}
						handleChange={(event) => handleChange(toDate, setToDate, [], event)}
					/>
				</FieldsetComponent>
			</Fieldset>
		</FormWrapper>
	);
};

export default TimeForm;
