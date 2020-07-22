import PropTypes from 'prop-types';
import React from 'react';

const ContentHeader = props => {

	const { text } = props;

	return (
		text
			? (
				<div className="content-header">
					{ text }
				</div>
			)
			: null
	);

};

ContentHeader.propTypes = {
	text: PropTypes.string
};

export default ContentHeader;
