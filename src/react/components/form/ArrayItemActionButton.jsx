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

export default ArrayItemActionButton;
