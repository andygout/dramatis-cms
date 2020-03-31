import React from 'react';

const ArrayItem = props => {

	const { isRemovalButtonReqd, handleRemovalClick } = props;

	return (
		<div className="fieldset__removal-button-placeholder">

			{
				isRemovalButtonReqd && (
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

export default ArrayItem;
