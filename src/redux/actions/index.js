import {
	newFormDataFetched as awardNewFormDataFetched,
	editFormDataFetched as awardEditFormDataFetched
} from '../slices/award-form-data.js';
import {
	fetched as awardFetched,
	created as awardCreated,
	updated as awardUpdated,
	deleted as awardDeleted
} from '../slices/award.js';
import {
	fetched as awardsFetched
} from '../slices/awards.js';
import {
	newFormDataFetched as awardCeremonyNewFormDataFetched,
	editFormDataFetched as awardCeremonyEditFormDataFetched
} from '../slices/award-ceremony-form-data.js';
import {
	fetched as awardCeremonyFetched,
	created as awardCeremonyCreated,
	updated as awardCeremonyUpdated,
	deleted as awardCeremonyDeleted
} from '../slices/award-ceremony.js';
import {
	fetched as awardCeremoniesFetched
} from '../slices/award-ceremonies.js';
import {
	newFormDataFetched as characterNewFormDataFetched,
	editFormDataFetched as characterEditFormDataFetched
} from '../slices/character-form-data.js';
import {
	fetched as characterFetched,
	created as characterCreated,
	updated as characterUpdated,
	deleted as characterDeleted
} from '../slices/character.js';
import {
	fetched as charactersFetched
} from '../slices/characters.js';
import {
	newFormDataFetched as companyNewFormDataFetched,
	editFormDataFetched as companyEditFormDataFetched
} from '../slices/company-form-data.js';
import {
	fetched as companyFetched,
	created as companyCreated,
	updated as companyUpdated,
	deleted as companyDeleted
} from '../slices/company.js';
import {
	fetched as companiesFetched
} from '../slices/companies.js';
import {
	activated as errorActivated,
	deactivated as errorDeactivated
} from '../slices/error.js';
import {
	newFormDataFetched as festivalNewFormDataFetched,
	editFormDataFetched as festivalEditFormDataFetched
} from '../slices/festival-form-data.js';
import {
	fetched as festivalFetched,
	created as festivalCreated,
	updated as festivalUpdated,
	deleted as festivalDeleted
} from '../slices/festival.js';
import {
	fetched as festivalsFetched
} from '../slices/festivals.js';
import {
	newFormDataFetched as festivalSeriesNewFormDataFetched,
	editFormDataFetched as festivalSeriesEditFormDataFetched
} from '../slices/festival-series-form-data.js';
import {
	fetched as festivalSeriesFetched,
	created as festivalSeriesCreated,
	updated as festivalSeriesUpdated,
	deleted as festivalSeriesDeleted
} from '../slices/festival-series.js';
import {
	fetched as festivalSeriesesFetched
} from '../slices/festival-serieses.js';
import {
	newFormDataFetched as materialNewFormDataFetched,
	editFormDataFetched as materialEditFormDataFetched
} from '../slices/material-form-data.js';
import {
	fetched as materialFetched,
	created as materialCreated,
	updated as materialUpdated,
	deleted as materialDeleted
} from '../slices/material.js';
import {
	fetched as materialsFetched
} from '../slices/materials.js';
import {
	activated as notificationActivated,
	deactivated as notificationDeactivated
} from '../slices/notification.js';
import {
	newFormDataFetched as personNewFormDataFetched,
	editFormDataFetched as personEditFormDataFetched
} from '../slices/person-form-data.js';
import {
	fetched as personFetched,
	created as personCreated,
	updated as personUpdated,
	deleted as personDeleted
} from '../slices/person.js';
import {
	fetched as peopleFetched
} from '../slices/people.js';
import {
	newFormDataFetched as productionNewFormDataFetched,
	editFormDataFetched as productionEditFormDataFetched
} from '../slices/production-form-data.js';
import {
	fetched as productionFetched,
	created as productionCreated,
	updated as productionUpdated,
	deleted as productionDeleted
} from '../slices/production.js';
import {
	fetched as productionsFetched
} from '../slices/productions.js';
import {
	activated as redirectActivated,
	deactivated as redirectDeactivated
} from '../slices/redirect.js';
import {
	newFormDataFetched as seasonNewFormDataFetched,
	editFormDataFetched as seasonEditFormDataFetched
} from '../slices/season-form-data.js';
import {
	fetched as seasonFetched,
	created as seasonCreated,
	updated as seasonUpdated,
	deleted as seasonDeleted
} from '../slices/season.js';
import {
	fetched as seasonsFetched
} from '../slices/seasons.js';
import {
	newFormDataFetched as venueNewFormDataFetched,
	editFormDataFetched as venueEditFormDataFetched
} from '../slices/venue-form-data.js';
import {
	fetched as venueFetched,
	created as venueCreated,
	updated as venueUpdated,
	deleted as venueDeleted
} from '../slices/venue.js';
import {
	fetched as venuesFetched
} from '../slices/venues.js';

export {
	awardCeremonyNewFormDataFetched,
	awardCeremonyEditFormDataFetched,
	awardCeremonyFetched,
	awardCeremonyCreated,
	awardCeremonyUpdated,
	awardCeremonyDeleted,
	awardCeremoniesFetched,
	awardNewFormDataFetched,
	awardEditFormDataFetched,
	awardFetched,
	awardCreated,
	awardUpdated,
	awardDeleted,
	awardsFetched,
	characterNewFormDataFetched,
	characterEditFormDataFetched,
	characterFetched,
	characterCreated,
	characterUpdated,
	characterDeleted,
	charactersFetched,
	companyNewFormDataFetched,
	companyEditFormDataFetched,
	companyFetched,
	companyCreated,
	companyUpdated,
	companyDeleted,
	companiesFetched,
	errorActivated,
	errorDeactivated,
	festivalNewFormDataFetched,
	festivalEditFormDataFetched,
	festivalFetched,
	festivalCreated,
	festivalUpdated,
	festivalDeleted,
	festivalsFetched,
	festivalSeriesNewFormDataFetched,
	festivalSeriesEditFormDataFetched,
	festivalSeriesFetched,
	festivalSeriesCreated,
	festivalSeriesUpdated,
	festivalSeriesDeleted,
	festivalSeriesesFetched,
	materialNewFormDataFetched,
	materialEditFormDataFetched,
	materialFetched,
	materialCreated,
	materialUpdated,
	materialDeleted,
	materialsFetched,
	notificationActivated,
	notificationDeactivated,
	personNewFormDataFetched,
	personEditFormDataFetched,
	personFetched,
	personCreated,
	personUpdated,
	personDeleted,
	peopleFetched,
	productionNewFormDataFetched,
	productionEditFormDataFetched,
	productionFetched,
	productionCreated,
	productionUpdated,
	productionDeleted,
	productionsFetched,
	redirectActivated,
	redirectDeactivated,
	seasonNewFormDataFetched,
	seasonEditFormDataFetched,
	seasonFetched,
	seasonCreated,
	seasonUpdated,
	seasonDeleted,
	seasonsFetched,
	venueNewFormDataFetched,
	venueEditFormDataFetched,
	venueFetched,
	venueCreated,
	venueUpdated,
	venueDeleted,
	venuesFetched
};
