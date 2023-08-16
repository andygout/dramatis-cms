import {
	Award,
	Awards,
	AwardCeremony,
	AwardCeremonies,
	Character,
	Characters,
	Company,
	Companies,
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
} from './pages';

import { deactivateError } from '../redux/actions/error';
import { fetchList, fetchInstanceTemplate, fetchInstance } from '../redux/actions/model';
import { deactivateNotification } from '../redux/actions/notification';
import { MODELS, PLURALISED_MODELS } from '../utils/constants';

export default [
	{
		path: '/',
		documentTitle: () => 'Home',
		component: Home,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification())
		]
	},
	{
		path: '/awards',
		documentTitle: () => 'Awards',
		component: Awards,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList(PLURALISED_MODELS.AWARDS))
		]
	},
	{
		path: '/awards/new',
		documentTitle: () => 'New award',
		component: Award,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate(MODELS.AWARD))
		]
	},
	{
		path: '/awards/:uuid',
		documentTitle: () => 'Award',
		component: Award,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.AWARD, uuid))
		]
	},
	{
		path: '/award-ceremonies',
		documentTitle: () => 'Award ceremonies',
		component: AwardCeremonies,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList(PLURALISED_MODELS.AWARD_CEREMONIES))
		]
	},
	{
		path: '/award-ceremonies/new',
		documentTitle: () => 'New award ceremony',
		component: AwardCeremony,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate(MODELS.AWARD_CEREMONY))
		]
	},
	{
		path: '/award-ceremonies/:uuid',
		documentTitle: () => 'Award ceremony',
		component: AwardCeremony,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.AWARD_CEREMONY, uuid))
		]
	},
	{
		path: '/characters',
		documentTitle: () => 'Characters',
		component: Characters,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList(PLURALISED_MODELS.CHARACTERS))
		]
	},
	{
		path: '/characters/new',
		documentTitle: () => 'New character',
		component: Character,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate(MODELS.CHARACTER))
		]
	},
	{
		path: '/characters/:uuid',
		documentTitle: () => 'Character',
		component: Character,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.CHARACTER, uuid))
		]
	},
	{
		path: '/companies',
		documentTitle: () => 'Companies',
		component: Companies,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList(PLURALISED_MODELS.COMPANIES))
		]
	},
	{
		path: '/companies/new',
		documentTitle: () => 'New company',
		component: Company,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate(MODELS.COMPANY))
		]
	},
	{
		path: '/companies/:uuid',
		documentTitle: () => 'Company',
		component: Company,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.COMPANY, uuid))
		]
	},
	{
		path: '/materials',
		documentTitle: () => 'Materials',
		component: Materials,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList(PLURALISED_MODELS.MATERIALS))
		]
	},
	{
		path: '/materials/new',
		documentTitle: () => 'New material',
		component: Material,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate(MODELS.MATERIAL))
		]
	},
	{
		path: '/materials/:uuid',
		documentTitle: () => 'Material',
		component: Material,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.MATERIAL, uuid))
		]
	},
	{
		path: '/people',
		documentTitle: () => 'People',
		component: People,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList(PLURALISED_MODELS.PEOPLE))
		]
	},
	{
		path: '/people/new',
		documentTitle: () => 'New person',
		component: Person,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate(MODELS.PERSON))
		]
	},
	{
		path: '/people/:uuid',
		documentTitle: () => 'Person',
		component: Person,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.PERSON, uuid))
		]
	},
	{
		path: '/productions',
		documentTitle: () => 'Productions',
		component: Productions,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList(PLURALISED_MODELS.PRODUCTIONS))
		]
	},
	{
		path: '/productions/new',
		documentTitle: () => 'New production',
		component: Production,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate(MODELS.PRODUCTION))
		]
	},
	{
		path: '/productions/:uuid',
		documentTitle: () => 'Production',
		component: Production,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.PRODUCTION, uuid))
		]
	},
	{
		path: '/seasons',
		documentTitle: () => 'Seasons',
		component: Seasons,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList(PLURALISED_MODELS.SEASONS))
		]
	},
	{
		path: '/seasons/new',
		documentTitle: () => 'New season',
		component: Season,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate(MODELS.SEASON))
		]
	},
	{
		path: '/seasons/:uuid',
		documentTitle: () => 'Season',
		component: Season,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.SEASON, uuid))
		]
	},
	{
		path: '/venues',
		documentTitle: () => 'Venues',
		component: Venues,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList(PLURALISED_MODELS.VENUES))
		]
	},
	{
		path: '/venues/new',
		documentTitle: () => 'New venue',
		component: Venue,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate(MODELS.VENUE))
		]
	},
	{
		path: '/venues/:uuid',
		documentTitle: () => 'Venue',
		component: Venue,
		fetchData: [
			dispatch => dispatch(deactivateError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.VENUE, uuid))
		]
	},
	{
		path: '*',
		documentTitle: () => 'Not Found',
		component: NotFound,
		fetchData: [
			dispatch => dispatch(deactivateNotification())
		]
	}
];
