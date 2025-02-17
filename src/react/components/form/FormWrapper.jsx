import { capitalise } from '../../../lib/strings.js';
import { handleDelete, handleSubmit } from '../../utils/form.js';
import { ACTIONS } from '../../../utils/constants.js';

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

export default FormWrapper;
