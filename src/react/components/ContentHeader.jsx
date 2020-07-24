import PropTypes from 'prop-types';
import React from 'react';

const ContentHeader = props => {

	const { text } = props;

	return (
		<div className="content-header">
			{ text }
		</div>
	);

};

ContentHeader.propTypes = {
	text: PropTypes.string.isRequired
};

export default ContentHeader;
