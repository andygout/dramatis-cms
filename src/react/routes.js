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
	Venue,
	Venues,
	Home,
	NotFound
} from './pages';

import { cancelError } from '../redux/actions/error';
import { fetchList, fetchInstanceTemplate, fetchInstance } from '../redux/actions/model';
import { deactivateNotification } from '../redux/actions/notification';
import { MODELS, PLURALISED_MODELS } from '../utils/constants';

export default [
	{
		path: '/',
		exact: true,
		documentTitle: () => 'Home',
		component: Home,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification())
		]
	},
	{
		path: '/awards/ceremonies',
		exact: true,
		documentTitle: () => 'Award ceremonies',
		component: AwardCeremonies,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList(PLURALISED_MODELS.AWARD_CEREMONIES))
		]
	},
	{
		path: '/awards/ceremonies/new',
		exact: true,
		documentTitle: () => 'New award ceremony',
		component: AwardCeremony,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate(MODELS.AWARD_CEREMONY))
		]
	},
	{
		path: '/awards/ceremonies/:uuid',
		documentTitle: () => 'Award ceremony',
		component: AwardCeremony,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.AWARD_CEREMONY, uuid))
		]
	},
	{
		path: '/awards',
		exact: true,
		documentTitle: () => 'Awards',
		component: Awards,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList(PLURALISED_MODELS.AWARDS))
		]
	},
	{
		path: '/awards/new',
		exact: true,
		documentTitle: () => 'New award',
		component: Award,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate(MODELS.AWARD))
		]
	},
	{
		path: '/awards/:uuid',
		documentTitle: () => 'Award',
		component: Award,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.AWARD, uuid))
		]
	},
	{
		path: '/characters',
		exact: true,
		documentTitle: () => 'Characters',
		component: Characters,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList(PLURALISED_MODELS.CHARACTERS))
		]
	},
	{
		path: '/characters/new',
		exact: true,
		documentTitle: () => 'New character',
		component: Character,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate(MODELS.CHARACTER))
		]
	},
	{
		path: '/characters/:uuid',
		documentTitle: () => 'Character',
		component: Character,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.CHARACTER, uuid))
		]
	},
	{
		path: '/companies',
		exact: true,
		documentTitle: () => 'Companies',
		component: Companies,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList(PLURALISED_MODELS.COMPANIES))
		]
	},
	{
		path: '/companies/new',
		exact: true,
		documentTitle: () => 'New company',
		component: Company,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate(MODELS.COMPANY))
		]
	},
	{
		path: '/companies/:uuid',
		documentTitle: () => 'Company',
		component: Company,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.COMPANY, uuid))
		]
	},
	{
		path: '/materials',
		exact: true,
		documentTitle: () => 'Materials',
		component: Materials,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList(PLURALISED_MODELS.MATERIALS))
		]
	},
	{
		path: '/materials/new',
		exact: true,
		documentTitle: () => 'New material',
		component: Material,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate(MODELS.MATERIAL))
		]
	},
	{
		path: '/materials/:uuid',
		documentTitle: () => 'Material',
		component: Material,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.MATERIAL, uuid))
		]
	},
	{
		path: '/people',
		exact: true,
		documentTitle: () => 'People',
		component: People,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList(PLURALISED_MODELS.PEOPLE))
		]
	},
	{
		path: '/people/new',
		exact: true,
		documentTitle: () => 'New person',
		component: Person,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate(MODELS.PERSON))
		]
	},
	{
		path: '/people/:uuid',
		documentTitle: () => 'Person',
		component: Person,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.PERSON, uuid))
		]
	},
	{
		path: '/productions',
		exact: true,
		documentTitle: () => 'Productions',
		component: Productions,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList(PLURALISED_MODELS.PRODUCTIONS))
		]
	},
	{
		path: '/productions/new',
		exact: true,
		documentTitle: () => 'New production',
		component: Production,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate(MODELS.PRODUCTION))
		]
	},
	{
		path: '/productions/:uuid',
		documentTitle: () => 'Production',
		component: Production,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			(dispatch, { params: { uuid } }) => dispatch(fetchInstance(MODELS.PRODUCTION, uuid))
		]
	},
	{
		path: '/venues',
		exact: true,
		documentTitle: () => 'Venues',
		component: Venues,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchList(PLURALISED_MODELS.VENUES))
		]
	},
	{
		path: '/venues/new',
		exact: true,
		documentTitle: () => 'New venue',
		component: Venue,
		fetchData: [
			dispatch => dispatch(cancelError()),
			dispatch => dispatch(deactivateNotification()),
			dispatch => dispatch(fetchInstanceTemplate(MODELS.VENUE))
		]
	},
	{
		path: '/venues/:uuid',
		documentTitle: () => 'Venue',
		component: Venue,
		fetchData: [
			dispatch => dispatch(cancelError()),
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
