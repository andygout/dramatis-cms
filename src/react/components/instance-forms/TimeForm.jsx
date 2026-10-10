import { useEffect, useState } from 'react';

import { useCreateTimeMutation, useUpdateTimeMutation, useDeleteTimeMutation } from '../../../redux/slices/api.js';
import { handleChange } from '../../utils/form.js';
import { Fieldset, FieldsetComponent, FormWrapper, InputAndErrors } from '../form/index.js';

const deconstructDate = (date) => ({
	date: date?.replace(/^-/, ''),
	isBce: date?.startsWith('-') || false
});

const reconstructDate = (date, isBce) => (date ? `${isBce ? '-' : ''}${date}` : date);

const TimeForm = (props) => {
	const { instance, action } = props;

	const [createTime] = useCreateTimeMutation();
	const [updateTime] = useUpdateTimeMutation();
	const [deleteTime] = useDeleteTimeMutation();

	const [name, setName] = useState(instance.name);
	const [differentiator, setDifferentiator] = useState(instance.differentiator);
	const [fromDate, setFromDate] = useState(deconstructDate(instance.fromDate).date);
	const [fromDateIsBce, setFromDateIsBce] = useState(deconstructDate(instance.fromDate).isBce);
	const [toDate, setToDate] = useState(deconstructDate(instance.toDate).date);
	const [toDateIsBce, setToDateIsBce] = useState(deconstructDate(instance.toDate).isBce);
	const [errors, setErrors] = useState(instance.errors);

	useEffect(() => {
		setName(instance.name);
		setDifferentiator(instance.differentiator);

		const fromDateProperties = deconstructDate(instance.fromDate);
		setFromDate(fromDateProperties.date);
		setFromDateIsBce(fromDateProperties.isBce);

		const toDateProperties = deconstructDate(instance.toDate);
		setToDate(toDateProperties.date);
		setToDateIsBce(toDateProperties.isBce);

		setErrors(instance.errors);
	}, [instance]);

	const actionableInstance = {
		model: instance.model,
		uuid: instance.uuid,
		name,
		differentiator,
		fromDate: reconstructDate(fromDate, fromDateIsBce),
		toDate: reconstructDate(toDate, toDateIsBce)
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

				<FieldsetComponent label={'BCE'}>
					<input
						type="checkbox"
						checked={fromDateIsBce}
						onChange={(event) => setFromDateIsBce(event.target.checked)}
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

				<FieldsetComponent label={'BCE'}>
					<input
						type="checkbox"
						checked={toDateIsBce}
						onChange={(event) => setToDateIsBce(event.target.checked)}
					/>
				</FieldsetComponent>
			</Fieldset>
		</FormWrapper>
	);
};

export default TimeForm;
