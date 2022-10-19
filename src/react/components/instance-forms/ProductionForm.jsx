import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { getIn } from '../../../lib/object-interactions';
import { capitalise } from '../../../lib/strings';
import { ArrayItemActionButton, Fieldset, FieldsetComponent, FormWrapper, InputAndErrors } from '../form';
import {
	handleChange,
	checkIsLastArrayItem,
	handleAppendArrayItemClick,
	handleRemoveArrayItemClick,
	handleChangeToPerson,
	handleChangeToCompany
} from '../../utils/FormUtils';
import { MODELS } from '../../../utils/constants';

const ProductionForm = props => {

	const { instance, action } = props;

	const [name, setName] = useState(instance.name);
	const [startDate, setStartDate] = useState(instance.startDate);
	const [pressDate, setPressDate] = useState(instance.pressDate);
	const [endDate, setEndDate] = useState(instance.endDate);
	const [material, setMaterial] = useState(instance.material);
	const [venue, setVenue] = useState(instance.venue);
	const [producerCredits, setProducerCredits] = useState(instance.producerCredits);
	const [cast, setCast] = useState(instance.cast);
	const [creativeCredits, setCreativeCredits] = useState(instance.creativeCredits);
	const [crewCredits, setCrewCredits] = useState(instance.crewCredits);
	const [errors, setErrors] = useState(instance.errors);

	useEffect(() => {
		setName(instance.name);
		setStartDate(instance.startDate);
		setPressDate(instance.pressDate);
		setEndDate(instance.endDate);
		setMaterial(instance.material);
		setVenue(instance.venue);
		setProducerCredits(instance.producerCredits);
		setCast(instance.cast);
		setCreativeCredits(instance.creativeCredits);
		setCrewCredits(instance.crewCredits);
		setErrors(instance.errors);
	}, [instance]);

	const actionableInstance = {
		model: instance.model,
		uuid: instance.uuid,
		name,
		startDate,
		pressDate,
		endDate,
		material,
		venue,
		producerCredits,
		cast,
		creativeCredits,
		crewCredits
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
										errors={getIn(member, ['errors', 'name'])}
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
										errors={getIn(member, ['errors', 'differentiator'])}
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
										errors={getIn(entity, ['errors', 'name'])}
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
										errors={getIn(entity, ['errors', 'differentiator'])}
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
										errors={getIn(producerCredit, ['errors', 'name'])}
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
										errors={getIn(role, ['errors', 'name'])}
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
										errors={getIn(role, ['errors', 'characterName'])}
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
										errors={getIn(role, ['errors', 'characterDifferentiator'])}
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
										errors={getIn(role, ['errors', 'qualifier'])}
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
										errors={getIn(castMember, ['errors', 'name'])}
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
										errors={getIn(castMember, ['errors', 'differentiator'])}
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
										errors={getIn(creativeCredit, ['errors', 'name'])}
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
										errors={getIn(crewCredit, ['errors', 'name'])}
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
						errors={material && getIn(material, ['errors', 'name'])}
						handleChange={event => handleChange(material, setMaterial, ['name'], event)}
					/>

				</FieldsetComponent>

				<FieldsetComponent label={'Differentiator'}>

					<InputAndErrors
						value={material?.differentiator}
						errors={material && getIn(material, ['errors', 'differentiator'])}
						handleChange={event => handleChange(material, setMaterial, ['differentiator'], event)}
					/>

				</FieldsetComponent>

			</Fieldset>

			<Fieldset header={'Venue'}>

				<FieldsetComponent label={'Name'}>

					<InputAndErrors
						value={venue?.name}
						errors={venue && getIn(venue, ['errors', 'name'])}
						handleChange={event => handleChange(venue, setVenue, ['name'], event)}
					/>

				</FieldsetComponent>

				<FieldsetComponent label={'Differentiator'}>

					<InputAndErrors
						value={venue?.differentiator}
						errors={venue && getIn(venue, ['errors', 'differentiator'])}
						handleChange={event => handleChange(venue, setVenue, ['differentiator'], event)}
					/>

				</FieldsetComponent>

			</Fieldset>

			{ Boolean(producerCredits) && renderProducerCredits() }

			{ Boolean(cast) && renderCast() }

			{ Boolean(creativeCredits) && renderCreativeCredits() }

			{ Boolean(crewCredits) && renderCrewCredits() }

		</FormWrapper>
	);

};

ProductionForm.propTypes = {
	action: PropTypes.string.isRequired,
	instance: PropTypes.object.isRequired
};

export default ProductionForm;
