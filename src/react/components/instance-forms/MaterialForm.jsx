import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { capitalise } from '../../../lib/strings';
import { ArrayItemActionButton, Fieldset, FieldsetComponent, FormWrapper, InputAndErrors } from '../form';
import { handleChange, checkIsLastListItem, handleCreationClick, handleRemovalClick } from '../../utils/FormUtils';
import { CREDIT_TYPES, MODELS } from '../../../utils/constants';

const MaterialForm = props => {

	const { instance, action } = props;

	const [name, setName] = useState(instance.get('name'));
	const [differentiator, setDifferentiator] = useState(instance.get('differentiator'));
	const [format, setFormat] = useState(instance.get('format'));
	const [year, setYear] = useState(instance.get('year'));
	const [originalVersionMaterial, setOriginalVersionMaterial] = useState(instance.get('originalVersionMaterial'));
	const [writingCredits, setWritingCredits] = useState(instance.get('writingCredits'));
	const [subMaterials, setSubMaterials] = useState(instance.get('subMaterials'));
	const [characterGroups, setCharacterGroups] = useState(instance.get('characterGroups'));
	const [errors, setErrors] = useState(instance.get('errors'));

	useEffect(() => {
		setName(instance.get('name'));
		setDifferentiator(instance.get('differentiator'));
		setFormat(instance.get('format'));
		setYear(instance.get('year'));
		setOriginalVersionMaterial(instance.get('originalVersionMaterial'));
		setWritingCredits(instance.get('writingCredits'));
		setSubMaterials(instance.get('subMaterials'));
		setCharacterGroups(instance.get('characterGroups'));
		setErrors(instance.get('errors'));
	}, [instance]);

	const actionableInstance = {
		model: instance.get('model'),
		uuid: instance.get('uuid'),
		name,
		differentiator,
		format,
		year,
		originalVersionMaterial,
		writingCredits,
		subMaterials,
		characterGroups
	};

	const renderWritingEntities = (entities, entitiesStatePath) => {

		return (
			<FieldsetComponent label={'Writing entities (people, companies, materials)'} isArrayItem={true}>

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
											? handleCreationClick(writingCredits, setWritingCredits, statePath, event)
											: handleRemovalClick(writingCredits, setWritingCredits, statePath, event)
									}
								/>

								<FieldsetComponent label={`${capitalise(entity.get('model'))} name`} isArrayItem={true}>

									<InputAndErrors
										value={entity.get('name')}
										errors={entity.getIn(['errors', 'name'])}
										handleChange={event =>
											handleChange(
												writingCredits,
												setWritingCredits,
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
												writingCredits,
												setWritingCredits,
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
											handleChange(
												writingCredits,
												setWritingCredits,
												statePath.concat(['model']),
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
											handleChange(
												writingCredits,
												setWritingCredits,
												statePath.concat(['model']),
												event
											)
										}
									/>
									<label>{' Company'}</label>

									<input
										type={'radio'}
										value={MODELS.MATERIAL}
										checked={entity.get('model') === MODELS.MATERIAL}
										onChange={event =>
											handleChange(writingCredits,
												setWritingCredits,
												statePath.concat(['model']),
												event
											)
										}
									/>
									<label>{' Material'}</label>

								</FieldsetComponent>

							</div>
						);

					})
				}

			</FieldsetComponent>
		);

	};

	const renderWritingCredits = () => {

		return (
			<Fieldset header={'Writing credits'}>

				{
					writingCredits.map((writingCredit, index) => {

						const statePath = [index];

						const isLastListItem = checkIsLastListItem(index, writingCredits.size);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleCreationClick(writingCredits, setWritingCredits, statePath, event)
											: handleRemovalClick(writingCredits, setWritingCredits, statePath, event)
									}
								/>

								<FieldsetComponent label={'Credit name'} isArrayItem={true}>

									<InputAndErrors
										value={writingCredit.get('name')}
										errors={writingCredit.getIn(['errors', 'name'])}
										handleChange={event =>
											handleChange(
												writingCredits,
												setWritingCredits,
												statePath.concat(['name']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Credit type'} isArrayItem={true}>

									<input
										type={'radio'}
										value={''}
										checked={!writingCredit.get('creditType')}
										onChange={event =>
											handleChange(
												writingCredits,
												setWritingCredits,
												statePath.concat(['creditType']),
												event
											)
										}
									/>
									<label>{' Direct'}</label>

									<input
										type={'radio'}
										value={CREDIT_TYPES.NON_SPECIFIC_SOURCE_MATERIAL}
										checked={writingCredit.get('creditType') === CREDIT_TYPES.NON_SPECIFIC_SOURCE_MATERIAL}
										onChange={event =>
											handleChange(
												writingCredits,
												setWritingCredits,
												statePath.concat(['creditType']),
												event
											)
										}
									/>
									<label>{' Non-specific source material'}</label>

									<input
										type={'radio'}
										value={CREDIT_TYPES.RIGHTS_GRANTOR}
										checked={writingCredit.get('creditType') === CREDIT_TYPES.RIGHTS_GRANTOR}
										onChange={event =>
											handleChange(writingCredits,
												setWritingCredits,
												statePath.concat(['creditType']),
												event
											)
										}
									/>
									<label>{' Rights grantor'}</label>

								</FieldsetComponent>

								{ renderWritingEntities(writingCredit.get('entities'), statePath.concat(['entities'])) }

							</div>
						);

					})
				}

			</Fieldset>
		);

	};

	const renderSubMaterials = () => {

		return (
			<Fieldset header={'Sub-materials'}>

				{
					subMaterials?.map((subMaterial, index) => {

						const statePath = [index];

						const isLastListItem = checkIsLastListItem(index, subMaterials.size);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleCreationClick(subMaterials, setSubMaterials, statePath, event)
											: handleRemovalClick(subMaterials, setSubMaterials, statePath, event)
									}
								/>

								<FieldsetComponent label={'Material name'} isArrayItem={true}>

									<InputAndErrors
										value={subMaterial.get('name')}
										errors={subMaterial.getIn(['errors', 'name'])}
										handleChange={event =>
											handleChange(
												subMaterials,
												setSubMaterials,
												statePath.concat(['name']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={subMaterial.get('differentiator')}
										errors={subMaterial.getIn(['errors', 'differentiator'])}
										handleChange={event =>
											handleChange(
												subMaterials,
												setSubMaterials,
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

			</Fieldset>
		);

	};

	const renderCharacters = (characters, charactersStatePath) => {

		return (
			<FieldsetComponent label={'Characters'} isArrayItem={true}>

				{
					characters.map((character, index) => {

						const statePath = charactersStatePath.concat([index]);

						const isLastListItem = checkIsLastListItem(index, characters.size);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleCreationClick(characterGroups, setCharacterGroups, statePath, event)
											: handleRemovalClick(characterGroups, setCharacterGroups, statePath, event)
									}
								/>

								<FieldsetComponent label={'Character name'} isArrayItem={true}>

									<InputAndErrors
										value={character.get('name')}
										errors={character.getIn(['errors', 'name'])}
										handleChange={event =>
											handleChange(
												characterGroups,
												setCharacterGroups,
												statePath.concat(['name']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Underlying name'} isArrayItem={true}>

									<InputAndErrors
										value={character.get('underlyingName')}
										errors={character.getIn(['errors', 'underlyingName'])}
										handleChange={event =>
											handleChange(
												characterGroups,
												setCharacterGroups,
												statePath.concat(['underlyingName']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={character.get('differentiator')}
										errors={character.getIn(['errors', 'differentiator'])}
										handleChange={event =>
											handleChange(
												characterGroups,
												setCharacterGroups,
												statePath.concat(['differentiator']),
												event
											)
										}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Qualifier'} isArrayItem={true}>

									<InputAndErrors
										value={character.get('qualifier')}
										errors={character.getIn(['errors', 'qualifier'])}
										handleChange={event =>
											handleChange(
												characterGroups,
												setCharacterGroups,
												statePath.concat(['qualifier']),
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

	const renderCharacterGroups = () => {

		return (
			<Fieldset header={'Character groups'}>

				{
					characterGroups.map((characterGroup, index) => {

						const statePath = [index];

						const isLastListItem = checkIsLastListItem(index, characterGroups.size);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleCreationClick(characterGroups, setCharacterGroups, statePath, event)
											: handleRemovalClick(characterGroups, setCharacterGroups, statePath, event)
									}
								/>

								<FieldsetComponent label={'Group name'} isArrayItem={true}>

									<InputAndErrors
										value={characterGroup.get('name')}
										errors={characterGroup.getIn(['errors', 'name'])}
										handleChange={event =>
											handleChange(
												characterGroups,
												setCharacterGroups,
												statePath.concat(['name']),
												event
											)
										}
									/>

								</FieldsetComponent>

								{ renderCharacters(characterGroup.get('characters'), statePath.concat(['characters'])) }

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

			<Fieldset header={'Differentiator'}>

				<InputAndErrors
					value={differentiator}
					errors={errors?.get('differentiator')}
					handleChange={event => handleChange(differentiator, setDifferentiator, [], event)}
				/>

			</Fieldset>

			<Fieldset header={'Format'}>

				<InputAndErrors
					value={format}
					errors={errors?.get('format')}
					handleChange={event => handleChange(format, setFormat, [], event)}
				/>

			</Fieldset>

			<Fieldset header={'Year'}>

				<InputAndErrors
					type={'number'}
					value={year}
					errors={errors?.get('year')}
					handleChange={event => handleChange(year, setYear, [], event)}
				/>

			</Fieldset>

			<Fieldset header={'Original version material'}>

				<FieldsetComponent label={'Name'}>

					<InputAndErrors
						value={originalVersionMaterial?.get('name')}
						errors={originalVersionMaterial?.getIn(['errors', 'name'])}
						handleChange={event =>
							handleChange(
								originalVersionMaterial,
								setOriginalVersionMaterial,
								['name'],
								event
							)
						}
					/>

				</FieldsetComponent>

				<FieldsetComponent label={'Differentiator'}>

					<InputAndErrors
						value={originalVersionMaterial?.get('differentiator')}
						errors={originalVersionMaterial?.getIn(['errors', 'differentiator'])}
						handleChange={event =>
							handleChange(
								originalVersionMaterial,
								setOriginalVersionMaterial,
								['differentiator'],
								event
							)
						}
					/>

				</FieldsetComponent>

			</Fieldset>

			{ Boolean(writingCredits) && renderWritingCredits() }

			{ Boolean(subMaterials) && renderSubMaterials() }

			{ Boolean(characterGroups) && renderCharacterGroups() }

		</FormWrapper>
	);

};

MaterialForm.propTypes = {
	action: PropTypes.string.isRequired,
	instance: PropTypes.object.isRequired
};

export default MaterialForm;
