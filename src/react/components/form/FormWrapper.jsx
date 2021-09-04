import PropTypes from 'prop-types';
import React from 'react';

import { capitalise } from '../../../lib/strings';
import { ACTIONS } from '../../../utils/constants';

const FormWrapper = props => {

	const { action, handleSubmit, handleDelete, children } = props;

	const submitButtonText = capitalise(action);

	const isDeleteButtonRequired = (action === ACTIONS.UPDATE);

	return (
		<form className="form" onSubmit={handleSubmit}>

			{ children }

			<button className="button">{ submitButtonText }</button>

			{
				isDeleteButtonRequired && (
					<button className="button" onClick={handleDelete}>Delete</button>
				)
			}

		</form>
	);

};

FormWrapper.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
	action: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired
};

export default FormWrapper;
