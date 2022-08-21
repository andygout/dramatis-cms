import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { Fieldset, FormWrapper, InputAndErrors } from '../form';
import { handleChange } from '../../utils/FormUtils';

const CharacterForm = props => {

	const { instance, action } = props;

	const [name, setName] = useState(instance.get('name'));
	const [differentiator, setDifferentiator] = useState(instance.get('differentiator'));
	const [errors, setErrors] = useState(instance.get('errors'));

	useEffect(() => {
		setName(instance.get('name'));
		setDifferentiator(instance.get('differentiator'));
		setErrors(instance.get('errors'));
	}, [instance]);

	const actionableInstance = {
		model: instance.get('model'),
		uuid: instance.get('uuid'),
		name,
		differentiator
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

		</FormWrapper>
	);

};

CharacterForm.propTypes = {
	action: PropTypes.string.isRequired,
	instance: PropTypes.object.isRequired
};

export default CharacterForm;
