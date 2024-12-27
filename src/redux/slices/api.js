import { createApi } from '@reduxjs/toolkit/query/react';

import getDifferentiatorSuffix from '../../lib/get-differentiator-suffix.js';
import pruneInstance from '../../lib/prune-instance.js';
import { deactivateNotification } from '../action-handlers/notification.js';
import {
	errorActivated,
	notificationActivated,
	redirectActivated
} from '../actions/index.js';
import {
	ACTIONS,
	MODELS,
	MODEL_TO_DISPLAY_NAME_MAP,
	MODEL_TO_PASCAL_CASE_MAP,
	MODEL_TO_ROUTE_MAP,
	NOTIFICATION_STATUSES,
	PLURALISED_MODELS,
	PLURALISED_MODEL_TO_ROUTE_MAP
} from '../../utils/constants.js';

const API_BASE_URL = 'http://localhost:3000';

const baseQuery = async ({ apiRoute, fetchSettings = {} }, { dispatch }) => {

	try {

		const apiUrl = `${API_BASE_URL}${apiRoute}`;

		const response = await fetch(apiUrl, { ...fetchSettings, mode: 'cors' });

		if (response.status !== 200) throw new Error(response.statusText);

		const responseJson = await response.json();

		return { data: responseJson };

	} catch (error) {

		dispatch(errorActivated({ message: error.message }));

		dispatch(deactivateNotification());

		return { error: error.toString() };

	}

};

const getInstancesQuery = pluralisedModel => {

	return {
		apiRoute: `/${PLURALISED_MODEL_TO_ROUTE_MAP[pluralisedModel]}`
	};

};

const getInstanceQuery = ({ model, uuid }) => {

	return {
		apiRoute: uuid
			? `/${MODEL_TO_ROUTE_MAP[model]}/${uuid}/edit`
			: `/${MODEL_TO_ROUTE_MAP[model]}/new`
	};

};

const createQuery = instance => {

	return {
		apiRoute: `/${MODEL_TO_ROUTE_MAP[instance.model]}`,
		fetchSettings: {
			method: 'POST',
			body: JSON.stringify(instance),
			headers: {
				'Content-Type': 'application/json'
			}
		}
	};

};

const updateQuery = instance => {

	return {
		apiRoute: `/${MODEL_TO_ROUTE_MAP[instance.model]}/${instance.uuid}`,
		fetchSettings: {
			method: 'PUT',
			body: JSON.stringify(instance),
			headers: {
				'Content-Type': 'application/json'
			}
		}
	};

};

const deleteQuery = instance => {

	return {
		apiRoute: `/${MODEL_TO_ROUTE_MAP[instance.model]}/${instance.uuid}`,
		fetchSettings: {
			method: 'DELETE'
		}
	};

};

const onCreateQueryStarted = async (queryArg, { dispatch, queryFulfilled }) => {

	const { data: instance } = await queryFulfilled;

	const { model, uuid, name, differentiator, hasErrors } = instance;

	const modelDisplayName = MODEL_TO_DISPLAY_NAME_MAP[model];

	let notification;

	if (hasErrors) {

		notification = {
			text: `This ${modelDisplayName} contains errors`,
			status: NOTIFICATION_STATUSES.failure
		};

		dispatch(notificationActivated(notification));

		const formData = {
			action: ACTIONS.CREATE,
			instance
		};

		dispatch(
			api.util.updateQueryData(
				`get${MODEL_TO_PASCAL_CASE_MAP[model]}`,
				undefined,
				draft => {
					draft.formData = formData;
				}
			)
		);

	} else {

		notification = {
			text: `${name} (${modelDisplayName})${getDifferentiatorSuffix(differentiator)} has been created`,
			status: NOTIFICATION_STATUSES.success
		};

		dispatch(redirectActivated({ path: `/${MODEL_TO_ROUTE_MAP[model]}/${uuid}`, notification }));

	}

};

const onUpdateQueryStarted = async (queryArg, { dispatch, queryFulfilled }) => {

	const { data: instance } = await queryFulfilled;

	const { model, name, differentiator, hasErrors } = instance;

	const modelDisplayName = MODEL_TO_DISPLAY_NAME_MAP[model];

	let notification;

	const formData = {
		action: ACTIONS.UPDATE,
		instance
	};

	if (hasErrors) {

		notification = {
			text: `This ${modelDisplayName} contains errors`,
			status: NOTIFICATION_STATUSES.failure
		};

		dispatch(
			api.util.updateQueryData(
				`get${MODEL_TO_PASCAL_CASE_MAP[model]}`,
				queryArg.uuid,
				draft => {
					draft.formData = formData;
				}
			)
		);

	} else {

		notification = {
			text: `${name} (${modelDisplayName})${getDifferentiatorSuffix(differentiator)} has been updated`,
			status: NOTIFICATION_STATUSES.success
		};

		const updatedGetInstanceQueryData = {
			instance: pruneInstance(instance),
			formData
		};

		dispatch(
			api.util.updateQueryData(
				`get${MODEL_TO_PASCAL_CASE_MAP[model]}`,
				queryArg.uuid,
				() => updatedGetInstanceQueryData
			)
		);

	}

	dispatch(notificationActivated(notification));

};

const onDeleteQueryStarted = async (queryArg, { dispatch, queryFulfilled }) => {

	const { data: instance } = await queryFulfilled;

	const { model, name, differentiator, hasErrors, errors } = instance;

	const modelDisplayName = MODEL_TO_DISPLAY_NAME_MAP[model];

	let notification;

	if (hasErrors) {

		const { associations } = errors;

		notification = {
			text: `This ${modelDisplayName} cannot be deleted because
				it has associations with instances
				of the following models: ${associations.join(', ')}`
			,
			status: NOTIFICATION_STATUSES.failure
		};

		dispatch(notificationActivated(notification));

	} else {

		notification = {
			text: `${name} (${modelDisplayName})${getDifferentiatorSuffix(differentiator)} has been deleted`,
			status: NOTIFICATION_STATUSES.success
		};

		dispatch(redirectActivated({ path: `/${MODEL_TO_ROUTE_MAP[model]}`, notification }));

	}

};

const transformGetResponse = (response, meta, queryUuidArg) => {

	const instance = response;

	const isExistingInstance = Boolean(queryUuidArg);

	return {
		instance: pruneInstance(instance),
		formData: {
			action: isExistingInstance ? ACTIONS.UPDATE : ACTIONS.CREATE,
			instance
		}
	};

};

export const api = createApi({
	baseQuery,
	endpoints: build => ({
		getAwards: build.query({
			query: () => getInstancesQuery(PLURALISED_MODELS.AWARDS)
		}),
		getAward: build.query({
			query: uuid => getInstanceQuery({ model: MODELS.AWARD, uuid }),
			transformResponse: transformGetResponse
		}),
		createAward: build.mutation({
			query: createQuery,
			onQueryStarted: onCreateQueryStarted
		}),
		updateAward: build.mutation({
			query: updateQuery,
			onQueryStarted: onUpdateQueryStarted
		}),
		deleteAward: build.mutation({
			query: deleteQuery,
			onQueryStarted: onDeleteQueryStarted
		}),
		getAwardCeremonies: build.query({
			query: () => getInstancesQuery(PLURALISED_MODELS.AWARD_CEREMONIES)
		}),
		getAwardCeremony: build.query({
			query: uuid => getInstanceQuery({ model: MODELS.AWARD_CEREMONY, uuid }),
			transformResponse: transformGetResponse
		}),
		createAwardCeremony: build.mutation({
			query: createQuery,
			onQueryStarted: onCreateQueryStarted
		}),
		updateAwardCeremony: build.mutation({
			query: updateQuery,
			onQueryStarted: onUpdateQueryStarted
		}),
		deleteAwardCeremony: build.mutation({
			query: deleteQuery,
			onQueryStarted: onDeleteQueryStarted
		}),
		getCharacters: build.query({
			query: () => getInstancesQuery(PLURALISED_MODELS.CHARACTERS)
		}),
		getCharacter: build.query({
			query: uuid => getInstanceQuery({ model: MODELS.CHARACTER, uuid }),
			transformResponse: transformGetResponse
		}),
		createCharacter: build.mutation({
			query: createQuery,
			onQueryStarted: onCreateQueryStarted
		}),
		updateCharacter: build.mutation({
			query: updateQuery,
			onQueryStarted: onUpdateQueryStarted
		}),
		deleteCharacter: build.mutation({
			query: deleteQuery,
			onQueryStarted: onDeleteQueryStarted
		}),
		getCompanies: build.query({
			query: () => getInstancesQuery(PLURALISED_MODELS.COMPANIES)
		}),
		getCompany: build.query({
			query: uuid => getInstanceQuery({ model: MODELS.COMPANY, uuid }),
			transformResponse: transformGetResponse
		}),
		createCompany: build.mutation({
			query: createQuery,
			onQueryStarted: onCreateQueryStarted
		}),
		updateCompany: build.mutation({
			query: updateQuery,
			onQueryStarted: onUpdateQueryStarted
		}),
		deleteCompany: build.mutation({
			query: deleteQuery,
			onQueryStarted: onDeleteQueryStarted
		}),
		getFestivals: build.query({
			query: () => getInstancesQuery(PLURALISED_MODELS.FESTIVALS)
		}),
		getFestival: build.query({
			query: uuid => getInstanceQuery({ model: MODELS.FESTIVAL, uuid }),
			transformResponse: transformGetResponse
		}),
		createFestival: build.mutation({
			query: createQuery,
			onQueryStarted: onCreateQueryStarted
		}),
		updateFestival: build.mutation({
			query: updateQuery,
			onQueryStarted: onUpdateQueryStarted
		}),
		deleteFestival: build.mutation({
			query: deleteQuery,
			onQueryStarted: onDeleteQueryStarted
		}),
		getFestivalSerieses: build.query({
			query: () => getInstancesQuery(PLURALISED_MODELS.FESTIVAL_SERIESES)
		}),
		getFestivalSeries: build.query({
			query: uuid => getInstanceQuery({ model: MODELS.FESTIVAL_SERIES, uuid }),
			transformResponse: transformGetResponse
		}),
		createFestivalSeries: build.mutation({
			query: createQuery,
			onQueryStarted: onCreateQueryStarted
		}),
		updateFestivalSeries: build.mutation({
			query: updateQuery,
			onQueryStarted: onUpdateQueryStarted
		}),
		deleteFestivalSeries: build.mutation({
			query: deleteQuery,
			onQueryStarted: onDeleteQueryStarted
		}),
		getMaterials: build.query({
			query: () => getInstancesQuery(PLURALISED_MODELS.MATERIALS)
		}),
		getMaterial: build.query({
			query: uuid => getInstanceQuery({ model: MODELS.MATERIAL, uuid }),
			transformResponse: transformGetResponse
		}),
		createMaterial: build.mutation({
			query: createQuery,
			onQueryStarted: onCreateQueryStarted
		}),
		updateMaterial: build.mutation({
			query: updateQuery,
			onQueryStarted: onUpdateQueryStarted
		}),
		deleteMaterial: build.mutation({
			query: deleteQuery,
			onQueryStarted: onDeleteQueryStarted
		}),
		getPeople: build.query({
			query: () => getInstancesQuery(PLURALISED_MODELS.PEOPLE)
		}),
		getPerson: build.query({
			query: uuid => getInstanceQuery({ model: MODELS.PERSON, uuid }),
			transformResponse: transformGetResponse
		}),
		createPerson: build.mutation({
			query: createQuery,
			onQueryStarted: onCreateQueryStarted
		}),
		updatePerson: build.mutation({
			query: updateQuery,
			onQueryStarted: onUpdateQueryStarted
		}),
		deletePerson: build.mutation({
			query: deleteQuery,
			onQueryStarted: onDeleteQueryStarted
		}),
		getProductions: build.query({
			query: () => getInstancesQuery(PLURALISED_MODELS.PRODUCTIONS)
		}),
		getProduction: build.query({
			query: uuid => getInstanceQuery({ model: MODELS.PRODUCTION, uuid }),
			transformResponse: transformGetResponse
		}),
		createProduction: build.mutation({
			query: createQuery,
			onQueryStarted: onCreateQueryStarted
		}),
		updateProduction: build.mutation({
			query: updateQuery,
			onQueryStarted: onUpdateQueryStarted
		}),
		deleteProduction: build.mutation({
			query: deleteQuery,
			onQueryStarted: onDeleteQueryStarted
		}),
		getSeasons: build.query({
			query: () => getInstancesQuery(PLURALISED_MODELS.SEASONS)
		}),
		getSeason: build.query({
			query: uuid => getInstanceQuery({ model: MODELS.SEASON, uuid }),
			transformResponse: transformGetResponse
		}),
		createSeason: build.mutation({
			query: createQuery,
			onQueryStarted: onCreateQueryStarted
		}),
		updateSeason: build.mutation({
			query: updateQuery,
			onQueryStarted: onUpdateQueryStarted
		}),
		deleteSeason: build.mutation({
			query: deleteQuery,
			onQueryStarted: onDeleteQueryStarted
		}),
		getVenues: build.query({
			query: () => getInstancesQuery(PLURALISED_MODELS.VENUES)
		}),
		getVenue: build.query({
			query: uuid => getInstanceQuery({ model: MODELS.VENUE, uuid }),
			transformResponse: transformGetResponse
		}),
		createVenue: build.mutation({
			query: createQuery,
			onQueryStarted: onCreateQueryStarted
		}),
		updateVenue: build.mutation({
			query: updateQuery,
			onQueryStarted: onUpdateQueryStarted
		}),
		deleteVenue: build.mutation({
			query: deleteQuery,
			onQueryStarted: onDeleteQueryStarted
		})
	})
});

export const {
	useGetAwardsQuery,
	useGetAwardQuery,
	useCreateAwardMutation,
	useUpdateAwardMutation,
	useDeleteAwardMutation,
	useGetAwardCeremoniesQuery,
	useGetAwardCeremonyQuery,
	useCreateAwardCeremonyMutation,
	useUpdateAwardCeremonyMutation,
	useDeleteAwardCeremonyMutation,
	useGetCharactersQuery,
	useGetCharacterQuery,
	useCreateCharacterMutation,
	useUpdateCharacterMutation,
	useDeleteCharacterMutation,
	useGetCompaniesQuery,
	useGetCompanyQuery,
	useCreateCompanyMutation,
	useUpdateCompanyMutation,
	useDeleteCompanyMutation,
	useGetFestivalsQuery,
	useGetFestivalQuery,
	useCreateFestivalMutation,
	useUpdateFestivalMutation,
	useDeleteFestivalMutation,
	useGetFestivalSeriesesQuery,
	useGetFestivalSeriesQuery,
	useCreateFestivalSeriesMutation,
	useUpdateFestivalSeriesMutation,
	useDeleteFestivalSeriesMutation,
	useGetMaterialsQuery,
	useGetMaterialQuery,
	useCreateMaterialMutation,
	useUpdateMaterialMutation,
	useDeleteMaterialMutation,
	useGetPeopleQuery,
	useGetPersonQuery,
	useCreatePersonMutation,
	useUpdatePersonMutation,
	useDeletePersonMutation,
	useGetProductionsQuery,
	useGetProductionQuery,
	useCreateProductionMutation,
	useUpdateProductionMutation,
	useDeleteProductionMutation,
	useGetSeasonsQuery,
	useGetSeasonQuery,
	useCreateSeasonMutation,
	useUpdateSeasonMutation,
	useDeleteSeasonMutation,
	useGetVenuesQuery,
	useGetVenueQuery,
	useCreateVenueMutation,
	useUpdateVenueMutation,
	useDeleteVenueMutation
} = api;
