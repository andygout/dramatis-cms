import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { capitalise } from '../../../lib/strings';
import { handleDelete, handleSubmit } from '../../utils/form';
import { createInstance, updateInstance, deleteInstance } from '../../../redux/actions/model';
import { ACTIONS } from '../../../utils/constants';

const FormWrapper = props => {

	const { action, instance, createInstance, updateInstance, deleteInstance, children } = props;

	const submitButtonText = capitalise(action);

	const isDeleteButtonRequired = (action === ACTIONS.UPDATE);

	return (
		<form
			className="form"
			onSubmit={event => handleSubmit(event, action, instance, createInstance, updateInstance)}
		>

			{ children }

			<button className="button">{ submitButtonText }</button>

			{
				isDeleteButtonRequired && (
					<button
						className="button"
						onClick={event => handleDelete(event, instance, deleteInstance)}
					>{'Delete'}</button>
				)
			}

		</form>
	);

};

FormWrapper.propTypes = {
	action: PropTypes.string.isRequired,
	instance: PropTypes.object.isRequired,
	createInstance: PropTypes.func.isRequired,
	updateInstance: PropTypes.func.isRequired,
	deleteInstance: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired
};

export default connect(null, { createInstance, updateInstance, deleteInstance })(FormWrapper);
