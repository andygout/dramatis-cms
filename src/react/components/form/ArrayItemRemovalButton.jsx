import PropTypes from 'prop-types';
import React from 'react';

const ArrayItemRemovalButton = props => {

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

ArrayItemRemovalButton.propTypes = {
	isRemovalButtonRequired: PropTypes.bool.isRequired,
	handleRemovalClick: PropTypes.func.isRequired
};

export default ArrayItemRemovalButton;
