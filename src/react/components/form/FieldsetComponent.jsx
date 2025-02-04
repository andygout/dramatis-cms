import classNames from 'classnames';

const FieldsetComponent = props => {

	const { label, isArrayItem, children } = props;

	return (
		<div
			className={
				classNames({
					'fieldset__component': !isArrayItem,
					'fieldset__module-component': isArrayItem
				})
			}
		>

			<label className="fieldset__label">{ label }:</label>

			{ children }

		</div>
	);

};

export default FieldsetComponent;
