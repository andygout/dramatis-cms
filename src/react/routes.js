import {
	Award,
	Awards,
	AwardCeremony,
	AwardCeremonies,
	Character,
	Characters,
	Company,
	Companies,
	Festival,
	Festivals,
	FestivalSeries,
	FestivalSerieses,
	Material,
	Materials,
	Person,
	People,
	Production,
	Productions,
	Season,
	Seasons,
	Venue,
	Venues,
	Home,
	NotFound
} from './pages/index.js';

import { deactivateError } from '../redux/action-handlers/error.js';
import { fetchList, fetchInstanceTemplate, fetchInstance } from '../redux/action-handlers/model.js';
import { deactivateNotification } from '../redux/action-handlers/notification.js';
import { MODELS, PLURALISED_MODELS } from '../utils/constants.js';

export default [
	{
		path: '/',
		documentTitle: () => 'Home',
		component: Home,
		fetchData: null,
		deactivateError,
		deactivateNotification
	},
	{
		path: '/awards',
		documentTitle: () => 'Awards',
		component: Awards,
		fetchData: dispatch => dispatch(fetchList(PLURALISED_MODELS.AWARDS)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/awards/new',
		documentTitle: () => 'New award',
		component: Award,
		fetchData: dispatch => dispatch(fetchInstanceTemplate(MODELS.AWARD)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/awards/:uuid',
		documentTitle: () => 'Award',
		component: Award,
		fetchData: (dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.AWARD, uuid)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/award-ceremonies',
		documentTitle: () => 'Award ceremonies',
		component: AwardCeremonies,
		fetchData: dispatch => dispatch(fetchList(PLURALISED_MODELS.AWARD_CEREMONIES)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/award-ceremonies/new',
		documentTitle: () => 'New award ceremony',
		component: AwardCeremony,
		fetchData: dispatch => dispatch(fetchInstanceTemplate(MODELS.AWARD_CEREMONY)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/award-ceremonies/:uuid',
		documentTitle: () => 'Award ceremony',
		component: AwardCeremony,
		fetchData: (dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.AWARD_CEREMONY, uuid)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/characters',
		documentTitle: () => 'Characters',
		component: Characters,
		fetchData: dispatch => dispatch(fetchList(PLURALISED_MODELS.CHARACTERS)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/characters/new',
		documentTitle: () => 'New character',
		component: Character,
		fetchData: dispatch => dispatch(fetchInstanceTemplate(MODELS.CHARACTER)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/characters/:uuid',
		documentTitle: () => 'Character',
		component: Character,
		fetchData: (dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.CHARACTER, uuid)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/companies',
		documentTitle: () => 'Companies',
		component: Companies,
		fetchData: dispatch => dispatch(fetchList(PLURALISED_MODELS.COMPANIES)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/companies/new',
		documentTitle: () => 'New company',
		component: Company,
		fetchData: dispatch => dispatch(fetchInstanceTemplate(MODELS.COMPANY)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/companies/:uuid',
		documentTitle: () => 'Company',
		component: Company,
		fetchData: (dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.COMPANY, uuid)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festivals',
		documentTitle: () => 'Festivals',
		component: Festivals,
		fetchData: dispatch => dispatch(fetchList(PLURALISED_MODELS.FESTIVALS)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festivals/new',
		documentTitle: () => 'New festival',
		component: Festival,
		fetchData: dispatch => dispatch(fetchInstanceTemplate(MODELS.FESTIVAL)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festivals/:uuid',
		documentTitle: () => 'Festival',
		component: Festival,
		fetchData: (dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.FESTIVAL, uuid)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festival-serieses',
		documentTitle: () => 'Festival serieses',
		component: FestivalSerieses,
		fetchData: dispatch => dispatch(fetchList(PLURALISED_MODELS.FESTIVAL_SERIESES)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festival-serieses/new',
		documentTitle: () => 'New festival series',
		component: FestivalSeries,
		fetchData: dispatch => dispatch(fetchInstanceTemplate(MODELS.FESTIVAL_SERIES)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/festival-serieses/:uuid',
		documentTitle: () => 'Festival series',
		component: FestivalSeries,
		fetchData: (dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.FESTIVAL_SERIES, uuid)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/materials',
		documentTitle: () => 'Materials',
		component: Materials,
		fetchData: dispatch => dispatch(fetchList(PLURALISED_MODELS.MATERIALS)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/materials/new',
		documentTitle: () => 'New material',
		component: Material,
		fetchData: dispatch => dispatch(fetchInstanceTemplate(MODELS.MATERIAL)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/materials/:uuid',
		documentTitle: () => 'Material',
		component: Material,
		fetchData: (dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.MATERIAL, uuid)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/people',
		documentTitle: () => 'People',
		component: People,
		fetchData: dispatch => dispatch(fetchList(PLURALISED_MODELS.PEOPLE)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/people/new',
		documentTitle: () => 'New person',
		component: Person,
		fetchData: dispatch => dispatch(fetchInstanceTemplate(MODELS.PERSON)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/people/:uuid',
		documentTitle: () => 'Person',
		component: Person,
		fetchData: (dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.PERSON, uuid)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/productions',
		documentTitle: () => 'Productions',
		component: Productions,
		fetchData: dispatch => dispatch(fetchList(PLURALISED_MODELS.PRODUCTIONS)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/productions/new',
		documentTitle: () => 'New production',
		component: Production,
		fetchData: dispatch => dispatch(fetchInstanceTemplate(MODELS.PRODUCTION)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/productions/:uuid',
		documentTitle: () => 'Production',
		component: Production,
		fetchData: (dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.PRODUCTION, uuid)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/seasons',
		documentTitle: () => 'Seasons',
		component: Seasons,
		fetchData: dispatch => dispatch(fetchList(PLURALISED_MODELS.SEASONS)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/seasons/new',
		documentTitle: () => 'New season',
		component: Season,
		fetchData: dispatch => dispatch(fetchInstanceTemplate(MODELS.SEASON)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/seasons/:uuid',
		documentTitle: () => 'Season',
		component: Season,
		fetchData: (dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.SEASON, uuid)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/venues',
		documentTitle: () => 'Venues',
		component: Venues,
		fetchData: dispatch => dispatch(fetchList(PLURALISED_MODELS.VENUES)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/venues/new',
		documentTitle: () => 'New venue',
		component: Venue,
		fetchData: dispatch => dispatch(fetchInstanceTemplate(MODELS.VENUE)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '/venues/:uuid',
		documentTitle: () => 'Venue',
		component: Venue,
		fetchData: (dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.VENUE, uuid)),
		deactivateError,
		deactivateNotification
	},
	{
		path: '*',
		documentTitle: () => 'Not Found',
		component: NotFound,
		fetchData: null,
		deactivateError: null,
		deactivateNotification
	}
];
