import classNames from 'classnames';
import PropTypes from 'prop-types';

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

FieldsetComponent.propTypes = {
	label: PropTypes.string.isRequired,
	isArrayItem: PropTypes.bool,
	children: PropTypes.node.isRequired
};

export default FieldsetComponent;
