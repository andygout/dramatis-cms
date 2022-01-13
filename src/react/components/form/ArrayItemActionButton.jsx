import PropTypes from 'prop-types';
import React from 'react';

const ArrayItemActionButton = props => {

	const { isLastListItem, handleClick } = props;

	return (
		<div className="fieldset__action-button-container">

			<button
				className="fieldset__action-button"
				onClick={handleClick}
			>{ isLastListItem ? '＋' : 'X' }</button>

		</div>
	);

};

ArrayItemActionButton.propTypes = {
	isLastListItem: PropTypes.bool.isRequired,
	handleClick: PropTypes.func.isRequired
};

export default ArrayItemActionButton;
