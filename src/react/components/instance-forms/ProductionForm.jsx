import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { capitalise } from '../../../lib/strings.js';
import { ArrayItemActionButton, Fieldset, FieldsetComponent, FormWrapper, InputAndErrors } from '../form/index.js';
import {
	handleChange,
	checkIsLastArrayItem,
	handleAppendArrayItemClick,
	handleRemoveArrayItemClick,
	handleChangeToPerson,
	handleChangeToCompany
} from '../../utils/form.js';
import { MODELS } from '../../../utils/constants.js';

const ProductionForm = props => {

	const { instance, action } = props;

	const [name, setName] = useState(instance.name);
	const [subtitle, setSubtitle] = useState(instance.subtitle);
	const [startDate, setStartDate] = useState(instance.startDate);
	const [pressDate, setPressDate] = useState(instance.pressDate);
	const [endDate, setEndDate] = useState(instance.endDate);
	const [material, setMaterial] = useState(instance.material);
	const [venue, setVenue] = useState(instance.venue);
	const [season, setSeason] = useState(instance.season);
	const [festival, setFestival] = useState(instance.festival);
	const [subProductions, setSubProductions] = useState(instance.subProductions);
	const [producerCredits, setProducerCredits] = useState(instance.producerCredits);
	const [cast, setCast] = useState(instance.cast);
	const [creativeCredits, setCreativeCredits] = useState(instance.creativeCredits);
	const [crewCredits, setCrewCredits] = useState(instance.crewCredits);
	const [reviews, setReviews] = useState(instance.reviews);
	const [errors, setErrors] = useState(instance.errors);

	useEffect(() => {
		setName(instance.name);
		setSubtitle(instance.subtitle);
		setStartDate(instance.startDate);
		setPressDate(instance.pressDate);
		setEndDate(instance.endDate);
		setMaterial(instance.material);
		setVenue(instance.venue);
		setSeason(instance.season);
		setFestival(instance.festival);
		setSubProductions(instance.subProductions);
		setProducerCredits(instance.producerCredits);
		setCast(instance.cast);
		setCreativeCredits(instance.creativeCredits);
		setCrewCredits(instance.crewCredits);
		setReviews(instance.reviews);
		setErrors(instance.errors);
	}, [instance]);

	const actionableInstance = {
		model: instance.model,
		uuid: instance.uuid,
		name,
		subtitle,
		startDate,
		pressDate,
		endDate,
		material,
		venue,
		season,
		festival,
		subProductions,
		producerCredits,
		cast,
		creativeCredits,
		crewCredits,
		reviews
	};

	const renderSubProductions = () => {

		return (
			<Fieldset header={'Sub-productions'}>

				{
					subProductions?.map((subProduction, index) => {

						const statePath = [index];

						const isLastListItem = checkIsLastArrayItem(index, subProductions.length);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleAppendArrayItemClick(
												subProductions,
												setSubProductions,
												statePath,
												event
											)
											: handleRemoveArrayItemClick(
												subProductions,
												setSubProductions,
												statePath,
												event
											)
									}
								/>

								<FieldsetComponent label={'Production UUID'} isArrayItem={true}>

									<InputAndErrors
										value={subProduction.uuid}
										errors={subProduction.errors.uuid}
										handleChange={event =>
											handleChange(
												subProductions,
												setSubProductions,
												statePath.concat(['uuid']),
												event
											)
										}
									/>

								</FieldsetComponent>

							</div>
						);

					})
				}

			</Fieldset>
		);

	};

	const renderMembers = (stateValue, setStateValue, members, membersStatePath) => {

		return (
			<FieldsetComponent label={'Credited company members (people)'} isArrayItem={true}>

				{
					members.map((member, index) => {

						const statePath = membersStatePath.concat([index]);

						const isLastListItem = checkIsLastArrayItem(index, members.length);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleAppendArrayItemClick(stateValue, setStateValue, statePath, event)
											: handleRemoveArrayItemClick(stateValue, setStateValue, statePath, event)
									}
								/>

								<FieldsetComponent label={'Person name'} isArrayItem={true}>

									<InputAndErrors
										value={member.name}
										errors={member.errors.name}
										handleChange={event =>
											handleChange(
												stateValue,
												setStateValue,
												statePath.concat(['name']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={member.differentiator}
										errors={member.errors.differentiator}
										handleChange={event =>
											handleChange(
												stateValue,
												setStateValue,
												statePath.concat(['differentiator']),
												event
											)
										}
									/>

								</FieldsetComponent>

							</div>
						);

					})
				}

			</FieldsetComponent>
		);

	};

	const renderEntities = (stateValue, setStateValue, entities, entitiesStatePath, teamName) => {

		return (
			<FieldsetComponent label={`${teamName} entities (people, companies)`} isArrayItem={true}>

				{
					entities.map((entity, index) => {

						const statePath = entitiesStatePath.concat([index]);

						const isLastListItem = checkIsLastArrayItem(index, entities.length);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleAppendArrayItemClick(stateValue, setStateValue, statePath, event)
											: handleRemoveArrayItemClick(stateValue, setStateValue, statePath, event)
									}
								/>

								<FieldsetComponent label={`${capitalise(entity.model)} name`} isArrayItem={true}>

									<InputAndErrors
										value={entity.name}
										errors={entity.errors.name}
										handleChange={event =>
											handleChange(
												stateValue,
												setStateValue,
												statePath.concat(['name']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={entity.differentiator}
										errors={entity.errors.differentiator}
										handleChange={event =>
											handleChange(
												stateValue,
												setStateValue,
												statePath.concat(['differentiator']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Model'} isArrayItem={true}>

									<input
										type={'radio'}
										value={MODELS.PERSON}
										checked={entity.model === MODELS.PERSON}
										onChange={event =>
											handleChangeToPerson(
												stateValue,
												setStateValue,
												statePath,
												entity,
												event
											)
										}
									/>
									<label>{' Person'}</label>

									<input
										type={'radio'}
										value={MODELS.COMPANY}
										checked={entity.model === MODELS.COMPANY}
										onChange={event =>
											handleChangeToCompany(
												stateValue,
												setStateValue,
												statePath,
												entity,
												event
											)
										}
									/>
									<label>{' Company'}</label>

								</FieldsetComponent>

								{
									entity.model === MODELS.COMPANY &&
									renderMembers(
										stateValue,
										setStateValue,
										entity.members || [],
										statePath.concat(['members'])
									)
								}

							</div>
						);

					})
				}

			</FieldsetComponent>
		);

	};

	const renderProducerCredits = () => {

		return (
			<Fieldset header={'Producer team credits'}>

				{
					producerCredits.map((producerCredit, index) => {

						const statePath = [index];

						const isLastListItem = checkIsLastArrayItem(index, producerCredits.length);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleAppendArrayItemClick(
												producerCredits,
												setProducerCredits,
												statePath,
												event
											)
											: handleRemoveArrayItemClick(
												producerCredits,
												setProducerCredits,
												statePath,
												event
											)
									}
								/>

								<FieldsetComponent label={'Credit name'} isArrayItem={true}>

									<InputAndErrors
										value={producerCredit.name}
										errors={producerCredit.errors.name}
										handleChange={event =>
											handleChange(
												producerCredits,
												setProducerCredits,
												statePath.concat(['name']),
												event
											)
										}
									/>

								</FieldsetComponent>

								{
									renderEntities(
										producerCredits,
										setProducerCredits,
										producerCredit.entities,
										statePath.concat(['entities']),
										'Producer'
									)
								}

							</div>
						);

					})
				}

			</Fieldset>
		);

	};

	const renderCastMemberRoles = (roles, rolesStatePath) => {

		return (
			<FieldsetComponent label={'Roles'} isArrayItem={true}>

				{
					roles.map((role, index) => {

						const statePath = rolesStatePath.concat([index]);

						const isLastListItem = checkIsLastArrayItem(index, roles.length);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleAppendArrayItemClick(cast, setCast, statePath, event)
											: handleRemoveArrayItemClick(cast, setCast, statePath, event)
									}
								/>

								<FieldsetComponent label={'Role name'} isArrayItem={true}>

									<InputAndErrors
										value={role.name}
										errors={role.errors.name}
										handleChange={event =>
											handleChange(
												cast,
												setCast,
												statePath.concat(['name']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Character name'} isArrayItem={true}>

									<InputAndErrors
										value={role.characterName}
										errors={role.errors.characterName}
										handleChange={event =>
											handleChange(
												cast,
												setCast,
												statePath.concat(['characterName']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Character differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={role.characterDifferentiator}
										errors={role.errors.characterDifferentiator}
										handleChange={event =>
											handleChange(
												cast,
												setCast,
												statePath.concat(['characterDifferentiator']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Qualifier'} isArrayItem={true}>

									<InputAndErrors
										value={role.qualifier}
										errors={role.errors.qualifier}
										handleChange={event =>
											handleChange(
												cast,
												setCast,
												statePath.concat(['qualifier']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Alternate'} isArrayItem={true}>

									<input
										type="checkbox"
										checked={role.isAlternate}
										onChange={event =>
											handleChange(
												cast,
												setCast,
												statePath.concat(['isAlternate']),
												event
											)
										}
									/>

								</FieldsetComponent>

							</div>
						);

					})
				}

			</FieldsetComponent>
		);

	};

	const renderCast = () => {

		return (
			<Fieldset header={'Cast'}>

				{
					cast.map((castMember, index) => {

						const statePath = [index];

						const isLastListItem = checkIsLastArrayItem(index, cast.length);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleAppendArrayItemClick(cast, setCast, statePath, event)
											: handleRemoveArrayItemClick(cast, setCast, statePath, event)
									}
								/>

								<FieldsetComponent label={'Person name'} isArrayItem={true}>

									<InputAndErrors
										value={castMember.name}
										errors={castMember.errors.name}
										handleChange={event =>
											handleChange(
												cast,
												setCast,
												statePath.concat(['name']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={castMember.differentiator}
										errors={castMember.errors.differentiator}
										handleChange={event =>
											handleChange(
												cast,
												setCast,
												statePath.concat(['differentiator']),
												event
											)
										}
									/>

								</FieldsetComponent>

								{ renderCastMemberRoles(castMember.roles, statePath.concat(['roles'])) }

							</div>
						);

					})
				}

			</Fieldset>
		);

	};

	const renderCreativeCredits = () => {

		return (
			<Fieldset header={'Creative team credits'}>

				{
					creativeCredits.map((creativeCredit, index) => {

						const statePath = [index];

						const isLastListItem = checkIsLastArrayItem(index, creativeCredits.length);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleAppendArrayItemClick(
												creativeCredits,
												setCreativeCredits,
												statePath,
												event
											)
											: handleRemoveArrayItemClick(
												creativeCredits,
												setCreativeCredits,
												statePath,
												event
											)
									}
								/>

								<FieldsetComponent label={'Credit name'} isArrayItem={true}>

									<InputAndErrors
										value={creativeCredit.name}
										errors={creativeCredit.errors.name}
										handleChange={event =>
											handleChange(
												creativeCredits,
												setCreativeCredits,
												statePath.concat(['name']),
												event
											)
										}
									/>

								</FieldsetComponent>

								{
									renderEntities(
										creativeCredits,
										setCreativeCredits,
										creativeCredit.entities,
										statePath.concat(['entities']),
										'Creative'
									)
								}

							</div>
						);

					})
				}

			</Fieldset>
		);

	};

	const renderCrewCredits = () => {

		return (
			<Fieldset header={'Crew credits'}>

				{
					crewCredits.map((crewCredit, index) => {

						const statePath = [index];

						const isLastListItem = checkIsLastArrayItem(index, crewCredits.length);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleAppendArrayItemClick(crewCredits, setCrewCredits, statePath, event)
											: handleRemoveArrayItemClick(crewCredits, setCrewCredits, statePath, event)
									}
								/>

								<FieldsetComponent label={'Credit name'} isArrayItem={true}>

									<InputAndErrors
										value={crewCredit.name}
										errors={crewCredit.errors.name}
										handleChange={event =>
											handleChange(
												crewCredits,
												setCrewCredits,
												statePath.concat(['name']),
												event
											)
										}
									/>

								</FieldsetComponent>

								{
									renderEntities(
										crewCredits,
										setCrewCredits,
										crewCredit.entities,
										statePath.concat(['entities']),
										'Crew'
									)
								}

							</div>
						);

					})
				}

			</Fieldset>
		);

	};

	const renderReviews = () => {

		return (
			<Fieldset header={'Reviews'}>

				{
					reviews.map((review, index) => {

						const statePath = [index];

						const isLastListItem = checkIsLastArrayItem(index, reviews.length);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleAppendArrayItemClick(reviews, setReviews, statePath, event)
											: handleRemoveArrayItemClick(reviews, setReviews, statePath, event)
									}
								/>

								<FieldsetComponent label={'URL'} isArrayItem={true}>

									<InputAndErrors
										value={review.url}
										errors={review.errors.url}
										handleChange={event =>
											handleChange(
												reviews,
												setReviews,
												statePath.concat(['url']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Date'} isArrayItem={true}>

									<InputAndErrors
										type={'date'}
										value={review.date}
										errors={review.errors.date}
										handleChange={event =>
											handleChange(
												reviews,
												setReviews,
												statePath.concat(['date']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Publication (company)'} isArrayItem={true}>

									<div className={'fieldset__module fieldset__module--nested'}>

										<FieldsetComponent label={'Name'} isArrayItem={true}>

											<InputAndErrors
												value={review.publication.name}
												errors={review.publication.errors.name}
												handleChange={event =>
													handleChange(
														reviews,
														setReviews,
														statePath.concat(['publication', 'name']),
														event
													)
												}
											/>

										</FieldsetComponent>

										<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

											<InputAndErrors
												value={review.publication.differentiator}
												errors={review.publication.errors.differentiator}
												handleChange={event =>
													handleChange(
														reviews,
														setReviews,
														statePath.concat(['publication', 'differentiator']),
														event
													)
												}
											/>

										</FieldsetComponent>

									</div>

								</FieldsetComponent>

								<FieldsetComponent label={'Critic (person)'} isArrayItem={true}>

									<div className={'fieldset__module fieldset__module--nested'}>

										<FieldsetComponent label={'Name'} isArrayItem={true}>

											<InputAndErrors
												value={review.critic.name}
												errors={review.critic.errors.name}
												handleChange={event =>
													handleChange(
														reviews,
														setReviews,
														statePath.concat(['critic', 'name']),
														event
													)
												}
											/>

										</FieldsetComponent>

										<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

											<InputAndErrors
												value={review.critic.differentiator}
												errors={review.critic.errors.differentiator}
												handleChange={event =>
													handleChange(
														reviews,
														setReviews,
														statePath.concat(['critic', 'differentiator']),
														event
													)
												}
											/>

										</FieldsetComponent>

									</div>

								</FieldsetComponent>

							</div>
						);

					})
				}

			</Fieldset>
		);

	};

	return (
		<FormWrapper
			action={action}
			instance={actionableInstance}
		>

			<Fieldset header={'Name'}>

				<InputAndErrors
					value={name}
					errors={errors?.name}
					handleChange={event => handleChange(name, setName, [], event)}
				/>

			</Fieldset>

			<Fieldset header={'Subtitle'}>

				<InputAndErrors
					value={subtitle}
					errors={errors?.subtitle}
					handleChange={event => handleChange(subtitle, setSubtitle, [], event)}
				/>

			</Fieldset>

			<Fieldset header={'Dates'}>

				<FieldsetComponent label={'Start date'}>

					<InputAndErrors
						type={'date'}
						value={startDate}
						errors={errors?.startDate}
						handleChange={event => handleChange(startDate, setStartDate, [], event)}
					/>

				</FieldsetComponent>

				<FieldsetComponent label={'Press date'}>

					<InputAndErrors
						type={'date'}
						value={pressDate}
						errors={errors?.pressDate}
						handleChange={event => handleChange(pressDate, setPressDate, [], event)}
					/>

				</FieldsetComponent>

				<FieldsetComponent label={'End date'}>

					<InputAndErrors
						type={'date'}
						value={endDate}
						errors={errors?.endDate}
						handleChange={event => handleChange(endDate, setEndDate, [], event)}
					/>

				</FieldsetComponent>

			</Fieldset>

			<Fieldset header={'Material'}>

				<FieldsetComponent label={'Name'}>

					<InputAndErrors
						value={material?.name}
						errors={material?.errors.name}
						handleChange={event => handleChange(material, setMaterial, ['name'], event)}
					/>

				</FieldsetComponent>

				<FieldsetComponent label={'Differentiator'}>

					<InputAndErrors
						value={material?.differentiator}
						errors={material?.errors.differentiator}
						handleChange={event => handleChange(material, setMaterial, ['differentiator'], event)}
					/>

				</FieldsetComponent>

			</Fieldset>

			<Fieldset header={'Venue'}>

				<FieldsetComponent label={'Name'}>

					<InputAndErrors
						value={venue?.name}
						errors={venue?.errors.name}
						handleChange={event => handleChange(venue, setVenue, ['name'], event)}
					/>

				</FieldsetComponent>

				<FieldsetComponent label={'Differentiator'}>

					<InputAndErrors
						value={venue?.differentiator}
						errors={venue?.errors.differentiator}
						handleChange={event => handleChange(venue, setVenue, ['differentiator'], event)}
					/>

				</FieldsetComponent>

			</Fieldset>

			<Fieldset header={'Season'}>

				<FieldsetComponent label={'Name'}>

					<InputAndErrors
						value={season?.name}
						errors={season?.errors.name}
						handleChange={event => handleChange(season, setSeason, ['name'], event)}
					/>

				</FieldsetComponent>

				<FieldsetComponent label={'Differentiator'}>

					<InputAndErrors
						value={season?.differentiator}
						errors={season?.errors.differentiator}
						handleChange={event => handleChange(season, setSeason, ['differentiator'], event)}
					/>

				</FieldsetComponent>

			</Fieldset>

			<Fieldset header={'Festival'}>

				<FieldsetComponent label={'Name'}>

					<InputAndErrors
						value={festival?.name}
						errors={festival?.errors.name}
						handleChange={event => handleChange(festival, setFestival, ['name'], event)}
					/>

				</FieldsetComponent>

				<FieldsetComponent label={'Differentiator'}>

					<InputAndErrors
						value={festival?.differentiator}
						errors={festival?.errors.differentiator}
						handleChange={event => handleChange(festival, setFestival, ['differentiator'], event)}
					/>

				</FieldsetComponent>

			</Fieldset>

			{ Boolean(subProductions) && renderSubProductions() }

			{ Boolean(producerCredits) && renderProducerCredits() }

			{ Boolean(cast) && renderCast() }

			{ Boolean(creativeCredits) && renderCreativeCredits() }

			{ Boolean(crewCredits) && renderCrewCredits() }

			{ Boolean(reviews) && renderReviews() }

		</FormWrapper>
	);

};

ProductionForm.propTypes = {
	action: PropTypes.string.isRequired,
	instance: PropTypes.object.isRequired
};

export default ProductionForm;
