import classNames from 'classnames';
import { createContext } from 'react';

export const FieldIdContext = createContext();

const FieldsetComponent = (props) => {
	const { fieldId, label, isArrayItem, children } = props;

	return (
		<FieldIdContext.Provider value={fieldId}>
			<div
				className={classNames({
					fieldset__component: !isArrayItem,
					'fieldset__module-component': isArrayItem
				})}
			>
				<label htmlFor={fieldId} className="fieldset__label">
					{label}:
				</label>

				{children}
			</div>
		</FieldIdContext.Provider>
	);
};

export default FieldsetComponent;
