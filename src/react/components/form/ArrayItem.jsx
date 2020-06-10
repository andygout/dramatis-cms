import React from 'react';

export default props => {

	const { isRemovalButtonRequired, handleRemovalClick } = props;

	return (
		<div className="fieldset__removal-button-placeholder">

			{
				isRemovalButtonRequired && (
					<a
						href="#"
						className="fieldset__removal-button"
						onClick={handleRemovalClick}
					>X</a>
				)
			}

		</div>
	);

};
