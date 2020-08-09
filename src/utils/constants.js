const FORM_ACTIONS = {
	create: 'CREATE',
	update: 'UPDATE'
};

const FORM_CONCEALED_KEYS = [
	'model',
	'uuid',
	'errors',
	'hasErrors'
];

const IRREGULAR_PLURAL_NOUNS_MAP = {
	person: 'people'
};

const NOTIFICATION_STATUSES = {
	success: 'SUCCESS',
	failure: 'FAILURE'
};

export {
	FORM_ACTIONS,
	FORM_CONCEALED_KEYS,
	IRREGULAR_PLURAL_NOUNS_MAP,
	NOTIFICATION_STATUSES
};
