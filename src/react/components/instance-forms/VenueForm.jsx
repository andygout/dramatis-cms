import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { ArrayItemActionButton, Fieldset, FieldsetComponent, FormWrapper, InputAndErrors } from '../form';
import { handleChange, checkIsLastListItem, handleCreationClick, handleRemovalClick } from '../../utils/FormUtils';

const VenueForm = props => {

	const { instance, action } = props;

	const [name, setName] = useState(instance.get('name'));
	const [differentiator, setDifferentiator] = useState(instance.get('differentiator'));
	const [subVenues, setSubVenues] = useState(instance.get('subVenues'));
	const [errors, setErrors] = useState(instance.get('errors'));

	useEffect(() => {
		setName(instance.get('name'));
		setDifferentiator(instance.get('differentiator'));
		setSubVenues(instance.get('subVenues'));
		setErrors(instance.get('errors'));
	}, [instance]);

	const actionableInstance = {
		model: instance.get('model'),
		uuid: instance.get('uuid'),
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

						const isLastListItem = checkIsLastListItem(index, subVenues.size);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleCreationClick(subVenues, setSubVenues, statePath, event)
											: handleRemovalClick(subVenues, setSubVenues, statePath, event)
									}
								/>

								<FieldsetComponent label={'Venue name'} isArrayItem={true}>

									<InputAndErrors
										value={subVenue.get('name')}
										errors={subVenue.getIn(['errors', 'name'])}
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
										value={subVenue.get('differentiator')}
										errors={subVenue.getIn(['errors', 'differentiator'])}
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
					errors={errors?.get('name')}
					handleChange={event => handleChange(name, setName, [], event)}
				/>

			</Fieldset>

			<Fieldset header={'Differentiator'}>

				<InputAndErrors
					value={differentiator}
					errors={errors?.get('differentiator')}
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
