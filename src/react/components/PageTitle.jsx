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
			{text}
		</h1>
	);

};

export default PageTitle;
