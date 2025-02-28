import classNames from 'classnames';

const PageTitle = props => {

	const { text, isNewInstance } = props;

	const className = classNames({
		'title-text': true,
		'title-text--muted': isNewInstance
	});

	return (
		<h1 className={className}>
			{ text }
		</h1>
	);

};

export default PageTitle;
