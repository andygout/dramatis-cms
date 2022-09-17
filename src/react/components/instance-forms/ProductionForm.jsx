import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { capitalise } from '../../../lib/strings';
import { ArrayItemActionButton, Fieldset, FieldsetComponent, FormWrapper, InputAndErrors } from '../form';
import {
	handleChange,
	checkIsLastListItem,
	handleCreationClick,
	handleRemovalClick,
	handleChangeToPerson,
	handleChangeToCompany
} from '../../utils/FormUtils';
import { MODELS } from '../../../utils/constants';

const ProductionForm = props => {

	const { instance, action } = props;

	const [name, setName] = useState(instance.get('name'));
	const [startDate, setStartDate] = useState(instance.get('startDate'));
	const [pressDate, setPressDate] = useState(instance.get('pressDate'));
	const [endDate, setEndDate] = useState(instance.get('endDate'));
	const [material, setMaterial] = useState(instance.get('material'));
	const [venue, setVenue] = useState(instance.get('venue'));
	const [producerCredits, setProducerCredits] = useState(instance.get('producerCredits'));
	const [cast, setCast] = useState(instance.get('cast'));
	const [creativeCredits, setCreativeCredits] = useState(instance.get('creativeCredits'));
	const [crewCredits, setCrewCredits] = useState(instance.get('crewCredits'));
	const [errors, setErrors] = useState(instance.get('errors'));

	useEffect(() => {
		setName(instance.get('name'));
		setStartDate(instance.get('startDate'));
		setPressDate(instance.get('pressDate'));
		setEndDate(instance.get('endDate'));
		setMaterial(instance.get('material'));
		setVenue(instance.get('venue'));
		setProducerCredits(instance.get('producerCredits'));
		setCast(instance.get('cast'));
		setCreativeCredits(instance.get('creativeCredits'));
		setCrewCredits(instance.get('crewCredits'));
		setErrors(instance.get('errors'));
	}, [instance]);

	const actionableInstance = {
		model: instance.get('model'),
		uuid: instance.get('uuid'),
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

						const isLastListItem = checkIsLastListItem(index, members.size);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleCreationClick(stateValue, setStateValue, statePath, event)
											: handleRemovalClick(stateValue, setStateValue, statePath, event)
									}
								/>

								<FieldsetComponent label={'Person name'} isArrayItem={true}>

									<InputAndErrors
										value={member.get('name')}
										errors={member.getIn(['errors', 'name'])}
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
										value={member.get('differentiator')}
										errors={member.getIn(['errors', 'differentiator'])}
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

						const isLastListItem = checkIsLastListItem(index, entities.size);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleCreationClick(stateValue, setStateValue, statePath, event)
											: handleRemovalClick(stateValue, setStateValue, statePath, event)
									}
								/>

								<FieldsetComponent label={`${capitalise(entity.get('model'))} name`} isArrayItem={true}>

									<InputAndErrors
										value={entity.get('name')}
										errors={entity.getIn(['errors', 'name'])}
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
										value={entity.get('differentiator')}
										errors={entity.getIn(['errors', 'differentiator'])}
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
										checked={entity.get('model') === MODELS.PERSON}
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
										checked={entity.get('model') === MODELS.COMPANY}
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
									entity.get('model') === MODELS.COMPANY &&
									renderMembers(
										stateValue,
										setStateValue,
										entity.get('members', []),
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

						const isLastListItem = checkIsLastListItem(index, producerCredits.size);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleCreationClick(producerCredits, setProducerCredits, statePath, event)
											: handleRemovalClick(producerCredits, setProducerCredits, statePath, event)
									}
								/>

								<FieldsetComponent label={'Credit name'} isArrayItem={true}>

									<InputAndErrors
										value={producerCredit.get('name')}
										errors={producerCredit.getIn(['errors', 'name'])}
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
										producerCredit.get('entities'),
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

						const isLastListItem = checkIsLastListItem(index, roles.size);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleCreationClick(cast, setCast, statePath, event)
											: handleRemovalClick(cast, setCast, statePath, event)
									}
								/>

								<FieldsetComponent label={'Role name'} isArrayItem={true}>

									<InputAndErrors
										value={role.get('name')}
										errors={role.getIn(['errors', 'name'])}
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
										value={role.get('characterName')}
										errors={role.getIn(['errors', 'characterName'])}
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
										value={role.get('characterDifferentiator')}
										errors={role.getIn(['errors', 'characterDifferentiator'])}
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
										value={role.get('qualifier')}
										errors={role.getIn(['errors', 'qualifier'])}
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
										checked={role.get('isAlternate')}
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

						const isLastListItem = checkIsLastListItem(index, cast.size);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleCreationClick(cast, setCast, statePath, event)
											: handleRemovalClick(cast, setCast, statePath, event)
									}
								/>

								<FieldsetComponent label={'Person name'} isArrayItem={true}>

									<InputAndErrors
										value={castMember.get('name')}
										errors={castMember.getIn(['errors', 'name'])}
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
										value={castMember.get('differentiator')}
										errors={castMember.getIn(['errors', 'differentiator'])}
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

								{ renderCastMemberRoles(castMember.get('roles'), statePath.concat(['roles'])) }

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

						const isLastListItem = checkIsLastListItem(index, creativeCredits.size);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleCreationClick(creativeCredits, setCreativeCredits, statePath, event)
											: handleRemovalClick(creativeCredits, setCreativeCredits, statePath, event)
									}
								/>

								<FieldsetComponent label={'Credit name'} isArrayItem={true}>

									<InputAndErrors
										value={creativeCredit.get('name')}
										errors={creativeCredit.getIn(['errors', 'name'])}
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
										creativeCredit.get('entities'),
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

						const isLastListItem = checkIsLastListItem(index, crewCredits.size);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleCreationClick(crewCredits, setCrewCredits, statePath, event)
											: handleRemovalClick(crewCredits, setCrewCredits, statePath, event)
									}
								/>

								<FieldsetComponent label={'Credit name'} isArrayItem={true}>

									<InputAndErrors
										value={crewCredit.get('name')}
										errors={crewCredit.getIn(['errors', 'name'])}
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
										crewCredit.get('entities'),
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
					errors={errors?.get('name')}
					handleChange={event => handleChange(name, setName, [], event)}
				/>

			</Fieldset>

			<Fieldset header={'Dates'}>

				<FieldsetComponent label={'Start date'}>

					<InputAndErrors
						type={'date'}
						value={startDate}
						errors={errors?.get('startDate')}
						handleChange={event => handleChange(startDate, setStartDate, [], event)}
					/>

				</FieldsetComponent>

				<FieldsetComponent label={'Press date'}>

					<InputAndErrors
						type={'date'}
						value={pressDate}
						errors={errors?.get('pressDate')}
						handleChange={event => handleChange(pressDate, setPressDate, [], event)}
					/>

				</FieldsetComponent>

				<FieldsetComponent label={'End date'}>

					<InputAndErrors
						type={'date'}
						value={endDate}
						errors={errors?.get('endDate')}
						handleChange={event => handleChange(endDate, setEndDate, [], event)}
					/>

				</FieldsetComponent>

			</Fieldset>

			<Fieldset header={'Material'}>

				<FieldsetComponent label={'Name'}>

					<InputAndErrors
						value={material?.get('name')}
						errors={material?.getIn(['errors', 'name'])}
						handleChange={event => handleChange(material, setMaterial, ['name'], event)}
					/>

				</FieldsetComponent>

				<FieldsetComponent label={'Differentiator'}>

					<InputAndErrors
						value={material?.get('differentiator')}
						errors={material?.getIn(['errors', 'differentiator'])}
						handleChange={event => handleChange(material, setMaterial, ['differentiator'], event)}
					/>

				</FieldsetComponent>

			</Fieldset>

			<Fieldset header={'Venue'}>

				<FieldsetComponent label={'Name'}>

					<InputAndErrors
						value={venue?.get('name')}
						errors={venue?.getIn(['errors', 'name'])}
						handleChange={event => handleChange(venue, setVenue, ['name'], event)}
					/>

				</FieldsetComponent>

				<FieldsetComponent label={'Differentiator'}>

					<InputAndErrors
						value={venue?.get('differentiator')}
						errors={venue?.getIn(['errors', 'differentiator'])}
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
