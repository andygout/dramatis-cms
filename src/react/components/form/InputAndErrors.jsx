import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Input, InputErrors } from '.';

const InputAndErrors = props => {

	const { value, errors, handleChange } = props;

	return (
		<React.Fragment>

			<Input
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
	value: PropTypes.string,
	errors: ImmutablePropTypes.list,
	handleChange: PropTypes.func.isRequired
};

export default InputAndErrors;
