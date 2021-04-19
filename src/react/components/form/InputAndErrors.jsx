import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Input, InputErrors } from '.';

const InputAndErrors = props => {

	const { type, value, errors, handleChange } = props;

	return (
		<React.Fragment>

			<Input
				type={type}
				value={value}
				hasErrors={!!errors}
				handleChange={handleChange}
			/>

			{
				!!errors && (
					<InputErrors errors={errors} />
				)
			}

		</React.Fragment>
	);

};

InputAndErrors.propTypes = {
	type: PropTypes.string,
	value: PropTypes.string,
	errors: ImmutablePropTypes.list,
	handleChange: PropTypes.func.isRequired
};

export default InputAndErrors;
