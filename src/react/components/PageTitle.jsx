import classNames from 'classnames';
import React from 'react';

const PageTitle = props => {

	const isEmptyTextString = props.text === '';

	const pageTitleClassName = classNames({
		'title-text': true,
		'title-text--muted': isEmptyTextString
	});

	const text = isEmptyTextString
		? `New ${props.model}`
		: props.text;

	return (
		<h1 className={pageTitleClassName}>
			{text}
		</h1>
	);

};

export default PageTitle;
