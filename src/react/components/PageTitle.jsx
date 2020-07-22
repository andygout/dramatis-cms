import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

const PageTitle = props => {

	const { text, isNewInstance } = props;

	const pageTitleClassName = classNames({
		'title-text': true,
		'title-text--muted': isNewInstance
	});

	return (
		<h1 className={pageTitleClassName}>
			{ text }
		</h1>
	);

};

PageTitle.propTypes = {
	text: PropTypes.string.isRequired,
	isNewInstance: PropTypes.bool
};

export default PageTitle;
