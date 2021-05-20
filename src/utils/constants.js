const CREDIT_TYPES = {
	NON_SPECIFIC_SOURCE_MATERIAL: 'NON_SPECIFIC_SOURCE_MATERIAL',
	RIGHTS_GRANTOR: 'RIGHTS_GRANTOR'
};

const FORM_ACTIONS = {
	create: 'CREATE',
	update: 'UPDATE'
};

const FORM_CONCEALED_KEYS = new Set([
	'model',
	'uuid',
	'errors',
	'hasErrors'
]);

const IRREGULAR_PLURAL_NOUNS_MAP = {
	company: 'companies',
	person: 'people'
};

const NOTIFICATION_STATUSES = {
	success: 'SUCCESS',
	failure: 'FAILURE'
};

export {
	CREDIT_TYPES,
	FORM_ACTIONS,
	FORM_CONCEALED_KEYS,
	IRREGULAR_PLURAL_NOUNS_MAP,
	NOTIFICATION_STATUSES
};
