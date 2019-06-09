export default camelCasedText =>
	camelCasedText
		.replace(/([A-Z])/g, match => ` ${match.toLowerCase()}`)
		.replace(/^./, match => match.toUpperCase());
