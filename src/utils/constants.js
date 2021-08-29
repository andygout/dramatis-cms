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

const MODEL_TO_ROUTE_MAP = {
	awardCeremony: 'awards/ceremonies'
};

const NOTIFICATION_STATUSES = {
	success: 'SUCCESS',
	failure: 'FAILURE'
};

const PLURALISED_MODEL_TO_ROUTE_MAP = {
	awardCeremonies: 'awards/ceremonies'
};

export {
	CREDIT_TYPES,
	FORM_ACTIONS,
	FORM_CONCEALED_KEYS,
	IRREGULAR_PLURAL_NOUNS_MAP,
	MODEL_TO_ROUTE_MAP,
	NOTIFICATION_STATUSES,
	PLURALISED_MODEL_TO_ROUTE_MAP
};
