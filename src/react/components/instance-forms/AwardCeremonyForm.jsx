import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { getIn } from '../../../lib/object-interactions';
import { capitalise } from '../../../lib/strings';
import { ArrayItemActionButton, Fieldset, FieldsetComponent, FormWrapper, InputAndErrors } from '../form';
import {
	handleChange,
	checkIsLastArrayItem,
	handleCreationClick,
	handleRemovalClick,
	handleChangeToPerson,
	handleChangeToCompany
} from '../../utils/FormUtils';
import { MODELS } from '../../../utils/constants';

const AwardCeremonyForm = props => {

	const { instance, action } = props;

	const [name, setName] = useState(instance.name);
	const [differentiator, setDifferentiator] = useState(instance.differentiator);
	const [award, setAward] = useState(instance.award);
	const [categories, setCategories] = useState(instance.categories);
	const [errors, setErrors] = useState(instance.errors);

	useEffect(() => {
		setName(instance.name);
		setDifferentiator(instance.differentiator);
		setAward(instance.award);
		setCategories(instance.categories);
		setErrors(instance.errors);
	}, [instance]);

	const actionableInstance = {
		model: instance.model,
		uuid: instance.uuid,
		name,
		differentiator,
		award,
		categories
	};

	const renderMembers = (members, membersStatePath) => {

		return (
			<FieldsetComponent label={'Nominated company members (people)'} isArrayItem={true}>

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
											? handleCreationClick(categories, setCategories, statePath, event)
											: handleRemovalClick(categories, setCategories, statePath, event)
									}
								/>

								<FieldsetComponent label={'Person name'} isArrayItem={true}>

									<InputAndErrors
										value={member.name}
										errors={getIn(member, ['errors', 'name'])}
										handleChange={event =>
											handleChange(
												categories,
												setCategories,
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
												categories,
												setCategories,
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

	const renderMaterials = (materials, materialsStatePath) => {

		return (
			<FieldsetComponent label={'Nominated materials'} isArrayItem={true}>

				{
					materials.map((material, index) => {

						const statePath = materialsStatePath.concat([index]);

						const isLastListItem = checkIsLastArrayItem(index, materials.length);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleCreationClick(categories, setCategories, statePath, event)
											: handleRemovalClick(categories, setCategories, statePath, event)
									}
								/>

								<FieldsetComponent label={'Material name'} isArrayItem={true}>

									<InputAndErrors
										value={material.name}
										errors={getIn(material, ['errors', 'name'])}
										handleChange={event =>
											handleChange(
												categories,
												setCategories,
												statePath.concat(['name']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={material.differentiator}
										errors={getIn(material, ['errors', 'differentiator'])}
										handleChange={event =>
											handleChange(
												categories,
												setCategories,
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

	const renderProductions = (productions, productionsStatePath) => {

		return (
			<FieldsetComponent label={'Nominated productions'} isArrayItem={true}>

				{
					productions.map((production, index) => {

						const statePath = productionsStatePath.concat([index]);

						const isLastListItem = checkIsLastArrayItem(index, productions.length);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleCreationClick(categories, setCategories, statePath, event)
											: handleRemovalClick(categories, setCategories, statePath, event)
									}
								/>

								<FieldsetComponent label={'Production UUID'} isArrayItem={true}>

									<InputAndErrors
										value={production.uuid}
										errors={getIn(production, ['errors', 'uuid'])}
										handleChange={event =>
											handleChange(
												categories,
												setCategories,
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

			</FieldsetComponent>
		);

	};

	const renderEntities = (entities, entitiesStatePath) => {

		return (
			<FieldsetComponent label={'Nominated entities (people, companies)'} isArrayItem={true}>

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
											? handleCreationClick(categories, setCategories, statePath, event)
											: handleRemovalClick(categories, setCategories, statePath, event)
									}
								/>

								<FieldsetComponent label={`${capitalise(entity.model)} name`} isArrayItem={true}>

									<InputAndErrors
										value={entity.name}
										errors={getIn(entity, ['errors', 'name'])}
										handleChange={event =>
											handleChange(
												categories,
												setCategories,
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
												categories,
												setCategories,
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
												categories,
												setCategories,
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
												categories,
												setCategories,
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
									renderMembers(entity.members || [], statePath.concat(['members']))
								}

							</div>
						);

					})
				}

			</FieldsetComponent>
		);

	};

	const renderNominations = (nominations, nominationsStatePath) => {

		return (
			<FieldsetComponent label={'Nominations'} isArrayItem={true}>

				{
					nominations.map((nomination, index) => {

						const statePath = nominationsStatePath.concat([index]);

						const isLastListItem = checkIsLastArrayItem(index, nominations.length);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<FieldsetComponent label={'Winner'} isArrayItem={true}>

									<input
										type="checkbox"
										checked={nomination.isWinner}
										onChange={event =>
											handleChange(
												categories,
												setCategories,
												statePath.concat(['isWinner']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Custom type'}>

									<InputAndErrors
										value={nomination.customType}
										errors={getIn(nomination, ['errors', 'customType'])}
										handleChange={event =>
											handleChange(
												categories,
												setCategories,
												statePath.concat(['customType']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleCreationClick(categories, setCategories, statePath, event)
											: handleRemovalClick(categories, setCategories, statePath, event)
									}
								/>

								{ renderEntities(nomination.entities, statePath.concat('entities')) }

								{ renderProductions(nomination.productions, statePath.concat('productions')) }

								{ renderMaterials(nomination.materials, statePath.concat('materials')) }

							</div>
						);

					})
				}

			</FieldsetComponent>
		);

	};

	const renderCategories = () => {

		return (
			<Fieldset header={'Categories'}>

				{
					categories?.map((category, index) => {

						const statePath = [index];

						const isLastListItem = checkIsLastArrayItem(index, categories.length);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleCreationClick(categories, setCategories, statePath, event)
											: handleRemovalClick(categories, setCategories, statePath, event)
									}
								/>

								<FieldsetComponent label={'Category name'} isArrayItem={true}>

									<InputAndErrors
										value={category.name}
										errors={getIn(category, ['errors', 'name'])}
										handleChange={event =>
											handleChange(
												categories,
												setCategories,
												statePath.concat(['name']),
												event
											)
										}
									/>

								</FieldsetComponent>

								{ renderNominations(category.nominations, statePath.concat(['nominations'])) }

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

			<Fieldset header={'Award'}>

				<FieldsetComponent label={'Name'}>

					<InputAndErrors
						value={award?.name}
						errors={award && getIn(award, ['errors', 'name'])}
						handleChange={event => handleChange(award, setAward, ['name'], event)}
					/>

				</FieldsetComponent>

				<FieldsetComponent label={'Differentiator'}>

					<InputAndErrors
						value={award?.differentiator}
						errors={award && getIn(award, ['errors', 'differentiator'])}
						handleChange={event => handleChange(award, setAward, ['differentiator'], event)}
					/>

				</FieldsetComponent>

			</Fieldset>

			{ Boolean(categories) && renderCategories() }

		</FormWrapper>
	);

};

AwardCeremonyForm.propTypes = {
	action: PropTypes.string.isRequired,
	instance: PropTypes.object.isRequired
};

export default AwardCeremonyForm;
