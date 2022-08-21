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

const AwardCeremonyForm = props => {

	const { instance, action } = props;

	const [name, setName] = useState(instance.get('name'));
	const [differentiator, setDifferentiator] = useState(instance.get('differentiator'));
	const [award, setAward] = useState(instance.get('award'));
	const [categories, setCategories] = useState(instance.get('categories'));
	const [errors, setErrors] = useState(instance.get('errors'));

	useEffect(() => {
		setName(instance.get('name'));
		setDifferentiator(instance.get('differentiator'));
		setAward(instance.get('award'));
		setCategories(instance.get('categories'));
		setErrors(instance.get('errors'));
	}, [instance]);

	const actionableInstance = {
		model: instance.get('model'),
		uuid: instance.get('uuid'),
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

						const isLastListItem = checkIsLastListItem(index, members.size);

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
										value={member.get('name')}
										errors={member.getIn(['errors', 'name'])}
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
										value={member.get('differentiator')}
										errors={member.getIn(['errors', 'differentiator'])}
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

						const isLastListItem = checkIsLastListItem(index, materials.size);

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
										value={material.get('name')}
										errors={material.getIn(['errors', 'name'])}
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
										value={material.get('differentiator')}
										errors={material.getIn(['errors', 'differentiator'])}
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

						const isLastListItem = checkIsLastListItem(index, productions.size);

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
										value={production.get('uuid')}
										errors={production.getIn(['errors', 'uuid'])}
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

						const isLastListItem = checkIsLastListItem(index, entities.size);

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

								<FieldsetComponent label={`${capitalise(entity.get('model'))} name`} isArrayItem={true}>

									<InputAndErrors
										value={entity.get('name')}
										errors={entity.getIn(['errors', 'name'])}
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
										value={entity.get('differentiator')}
										errors={entity.getIn(['errors', 'differentiator'])}
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
										checked={entity.get('model') === MODELS.PERSON}
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
										checked={entity.get('model') === MODELS.COMPANY}
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
									entity.get('model') === MODELS.COMPANY &&
									renderMembers(entity.get('members', []), statePath.concat(['members']))
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

						const isLastListItem = checkIsLastListItem(index, nominations.size);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<FieldsetComponent label={'Winner'} isArrayItem={true}>

									<input
										type="checkbox"
										checked={nomination.get('isWinner')}
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
										value={nomination.get('customType')}
										errors={nomination.getIn(['errors', 'customType'])}
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

								{ renderEntities(nomination.get('entities'), statePath.concat('entities')) }

								{ renderProductions(nomination.get('productions'), statePath.concat('productions')) }

								{ renderMaterials(nomination.get('materials'), statePath.concat('materials')) }

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

						const isLastListItem = checkIsLastListItem(index, categories.size);

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
										value={category.get('name')}
										errors={category.getIn(['errors', 'name'])}
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

								{ renderNominations(category.get('nominations'), statePath.concat(['nominations'])) }

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

			<Fieldset header={'Award'}>

				<FieldsetComponent label={'Name'}>

					<InputAndErrors
						value={award?.get('name')}
						errors={award?.getIn(['errors', 'name'])}
						handleChange={event => handleChange(award, setAward, ['name'], event)}
					/>

				</FieldsetComponent>

				<FieldsetComponent label={'Differentiator'}>

					<InputAndErrors
						value={award?.get('differentiator')}
						errors={award?.getIn(['errors', 'differentiator'])}
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
