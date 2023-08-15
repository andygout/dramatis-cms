const AWARD = 'AWARD';
const AWARDS = 'AWARDS';
const AWARD_CEREMONY = 'AWARD_CEREMONY';
const AWARD_CEREMONIES = 'AWARD_CEREMONIES';
const CHARACTER = 'CHARACTER';
const CHARACTERS = 'CHARACTERS';
const COMPANY = 'COMPANY';
const COMPANIES = 'COMPANIES';
const MATERIAL = 'MATERIAL';
const MATERIALS = 'MATERIALS';
const PERSON = 'PERSON';
const PEOPLE = 'PEOPLE';
const PRODUCTION = 'PRODUCTION';
const PRODUCTIONS = 'PRODUCTIONS';
const SEASON = 'SEASON';
const SEASONS = 'SEASONS';
const VENUE = 'VENUE';
const VENUES = 'VENUES';

const ACTIONS = {
	CREATE: 'CREATE',
	UPDATE: 'UPDATE'
};

const CREDIT_TYPES = {
	NON_SPECIFIC_SOURCE_MATERIAL: 'NON_SPECIFIC_SOURCE_MATERIAL',
	RIGHTS_GRANTOR: 'RIGHTS_GRANTOR'
};

const FORM_CONCEALED_KEYS = new Set([
	'errors'
]);

const FORM_UNEDITABLE_KEYS = new Set([
	'errors',
	'model'
]);

const MODELS = {
	[AWARD]: AWARD,
	[AWARD_CEREMONY]: AWARD_CEREMONY,
	[CHARACTER]: CHARACTER,
	[COMPANY]: COMPANY,
	[MATERIAL]: MATERIAL,
	[PERSON]: PERSON,
	[PRODUCTION]: PRODUCTION,
	[SEASON]: SEASON,
	[VENUE]: VENUE
};

const MODEL_TO_DISPLAY_NAME_MAP = {
	[AWARD]: 'award',
	[AWARD_CEREMONY]: 'award ceremony',
	[CHARACTER]: 'character',
	[COMPANY]: 'company',
	[MATERIAL]: 'material',
	[PERSON]: 'person',
	[PRODUCTION]: 'production',
	[SEASON]: 'season',
	[VENUE]: 'venue'
};

const MODEL_TO_PROP_NAME_MAP = {
	[AWARD]: 'award',
	[AWARD_CEREMONY]: 'awardCeremony',
	[CHARACTER]: 'character',
	[COMPANY]: 'company',
	[MATERIAL]: 'material',
	[PERSON]: 'person',
	[PRODUCTION]: 'production',
	[SEASON]: 'season',
	[VENUE]: 'venue'
};

const MODEL_TO_ROUTE_MAP = {
	[AWARD]: 'awards',
	[AWARD_CEREMONY]: 'award-ceremonies',
	[CHARACTER]: 'characters',
	[COMPANY]: 'companies',
	[MATERIAL]: 'materials',
	[PERSON]: 'people',
	[PRODUCTION]: 'productions',
	[SEASON]: 'seasons',
	[VENUE]: 'venues'
};

const NOTIFICATION_STATUSES = {
	success: 'SUCCESS',
	failure: 'FAILURE'
};

const PLURALISED_MODELS = {
	[AWARDS]: AWARDS,
	[AWARD_CEREMONIES]: AWARD_CEREMONIES,
	[CHARACTERS]: CHARACTERS,
	[COMPANIES]: COMPANIES,
	[MATERIALS]: MATERIALS,
	[PEOPLE]: PEOPLE,
	[PRODUCTIONS]: PRODUCTIONS,
	[SEASONS]: SEASONS,
	[VENUES]: VENUES
};

const PLURALISED_MODEL_TO_ROUTE_MAP = {
	[AWARDS]: 'awards',
	[AWARD_CEREMONIES]: 'award-ceremonies',
	[CHARACTERS]: 'characters',
	[COMPANIES]: 'companies',
	[MATERIALS]: 'materials',
	[PEOPLE]: 'people',
	[PRODUCTIONS]: 'productions',
	[SEASONS]: 'seasons',
	[VENUES]: 'venues'
};

export {
	ACTIONS,
	CREDIT_TYPES,
	FORM_CONCEALED_KEYS,
	FORM_UNEDITABLE_KEYS,
	MODELS,
	MODEL_TO_DISPLAY_NAME_MAP,
	MODEL_TO_PROP_NAME_MAP,
	MODEL_TO_ROUTE_MAP,
	NOTIFICATION_STATUSES,
	PLURALISED_MODELS,
	PLURALISED_MODEL_TO_ROUTE_MAP
};
