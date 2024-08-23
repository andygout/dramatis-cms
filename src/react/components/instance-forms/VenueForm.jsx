import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { ArrayItemActionButton, Fieldset, FieldsetComponent, FormWrapper, InputAndErrors } from '../form/index.js';
import {
	handleChange,
	checkIsLastArrayItem,
	handleAppendArrayItemClick,
	handleRemoveArrayItemClick
} from '../../utils/form.js';

const VenueForm = props => {

	const { instance, action } = props;

	const [name, setName] = useState(instance.name);
	const [differentiator, setDifferentiator] = useState(instance.differentiator);
	const [subVenues, setSubVenues] = useState(instance.subVenues);
	const [errors, setErrors] = useState(instance.errors);

	useEffect(() => {
		setName(instance.name);
		setDifferentiator(instance.differentiator);
		setSubVenues(instance.subVenues);
		setErrors(instance.errors);
	}, [instance]);

	const actionableInstance = {
		model: instance.model,
		uuid: instance.uuid,
		name,
		differentiator,
		subVenues
	};

	const renderSubVenues = () => {

		return (
			<Fieldset header={'Sub-venues'}>

				{
					subVenues?.map((subVenue, index) => {

						const statePath = [index];

						const isLastListItem = checkIsLastArrayItem(index, subVenues.length);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleAppendArrayItemClick(subVenues, setSubVenues, statePath, event)
											: handleRemoveArrayItemClick(subVenues, setSubVenues, statePath, event)
									}
								/>

								<FieldsetComponent label={'Venue name'} isArrayItem={true}>

									<InputAndErrors
										value={subVenue.name}
										errors={subVenue.errors.name}
										handleChange={event =>
											handleChange(
												subVenues,
												setSubVenues,
												statePath.concat(['name']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={subVenue.differentiator}
										errors={subVenue.errors.differentiator}
										handleChange={event =>
											handleChange(
												subVenues,
												setSubVenues,
												statePath.concat(['differentiator']),
												event
											)
										}
									/>

								</FieldsetComponent>

							</div>
						);

					})
				}

			</Fieldset>
		);

	};

	return (
		<FormWrapper
			action={action}
			instance={actionableInstance}
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

			{ Boolean(subVenues) && renderSubVenues() }

		</FormWrapper>
	);

};

VenueForm.propTypes = {
	action: PropTypes.string.isRequired,
	instance: PropTypes.object.isRequired
};

export default VenueForm;
