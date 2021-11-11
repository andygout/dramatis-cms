import PropTypes from 'prop-types';
import React from 'react';

const ArrayItemActionButton = props => {

	const { isLastListItem, handleClick } = props;

	return (
		<div className="fieldset__action-button-container">

			<a
				href="#"
				className="fieldset__action-button"
				onClick={handleClick}
			>{ isLastListItem ? '＋' : 'X' }</a>

		</div>
	);

};

ArrayItemActionButton.propTypes = {
	isLastListItem: PropTypes.bool.isRequired,
	handleClick: PropTypes.func.isRequired
};

export default ArrayItemActionButton;
