import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { getIn } from '../../../lib/object-interactions';
import { capitalise } from '../../../lib/strings';
import { ArrayItemActionButton, Fieldset, FieldsetComponent, FormWrapper, InputAndErrors } from '../form';
import {
	handleChange,
	checkIsLastArrayItem,
	handleAppendArrayItemClick,
	handleRemoveArrayItemClick
} from '../../utils/form';
import { CREDIT_TYPES, MODELS } from '../../../utils/constants';

const MaterialForm = props => {

	const { instance, action } = props;

	const [name, setName] = useState(instance.name);
	const [differentiator, setDifferentiator] = useState(instance.differentiator);
	const [format, setFormat] = useState(instance.format);
	const [year, setYear] = useState(instance.year);
	const [originalVersionMaterial, setOriginalVersionMaterial] = useState(instance.originalVersionMaterial);
	const [writingCredits, setWritingCredits] = useState(instance.writingCredits);
	const [subMaterials, setSubMaterials] = useState(instance.subMaterials);
	const [characterGroups, setCharacterGroups] = useState(instance.characterGroups);
	const [errors, setErrors] = useState(instance.errors);

	useEffect(() => {
		setName(instance.name);
		setDifferentiator(instance.differentiator);
		setFormat(instance.format);
		setYear(instance.year);
		setOriginalVersionMaterial(instance.originalVersionMaterial);
		setWritingCredits(instance.writingCredits);
		setSubMaterials(instance.subMaterials);
		setCharacterGroups(instance.characterGroups);
		setErrors(instance.errors);
	}, [instance]);

	const actionableInstance = {
		model: instance.model,
		uuid: instance.uuid,
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

						const isLastListItem = checkIsLastArrayItem(index, entities.length);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleAppendArrayItemClick(
												writingCredits,
												setWritingCredits,
												statePath,
												event
											)
											: handleRemoveArrayItemClick(
												writingCredits,
												setWritingCredits,
												statePath,
												event
											)
									}
								/>

								<FieldsetComponent label={`${capitalise(entity.model)} name`} isArrayItem={true}>

									<InputAndErrors
										value={entity.name}
										errors={getIn(entity, ['errors', 'name'])}
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
										value={entity.differentiator}
										errors={getIn(entity, ['errors', 'differentiator'])}
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
										checked={entity.model === MODELS.PERSON}
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
										checked={entity.model === MODELS.COMPANY}
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
										checked={entity.model === MODELS.MATERIAL}
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

						const isLastListItem = checkIsLastArrayItem(index, writingCredits.length);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleAppendArrayItemClick(
												writingCredits,
												setWritingCredits,
												statePath,
												event
											)
											: handleRemoveArrayItemClick(
												writingCredits,
												setWritingCredits,
												statePath,
												event
											)
									}
								/>

								<FieldsetComponent label={'Credit name'} isArrayItem={true}>

									<InputAndErrors
										value={writingCredit.name}
										errors={getIn(writingCredit, ['errors', 'name'])}
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
										checked={!writingCredit.creditType}
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
										checked={writingCredit.creditType === CREDIT_TYPES.NON_SPECIFIC_SOURCE_MATERIAL}
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
										checked={writingCredit.creditType === CREDIT_TYPES.RIGHTS_GRANTOR}
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

								{ renderWritingEntities(writingCredit.entities, statePath.concat(['entities'])) }

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

						const isLastListItem = checkIsLastArrayItem(index, subMaterials.length);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleAppendArrayItemClick(
												subMaterials,
												setSubMaterials,
												statePath,
												event
											)
											: handleRemoveArrayItemClick(
												subMaterials,
												setSubMaterials,
												statePath,
												event
											)
									}
								/>

								<FieldsetComponent label={'Material name'} isArrayItem={true}>

									<InputAndErrors
										value={subMaterial.name}
										errors={getIn(subMaterial, ['errors', 'name'])}
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
										value={subMaterial.differentiator}
										errors={getIn(subMaterial, ['errors', 'differentiator'])}
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

						const isLastListItem = checkIsLastArrayItem(index, characters.length);

						return (
							<div className={'fieldset__module fieldset__module--nested'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleAppendArrayItemClick(
												characterGroups,
												setCharacterGroups,
												statePath,
												event
											)
											: handleRemoveArrayItemClick(
												characterGroups,
												setCharacterGroups,
												statePath,
												event
											)
									}
								/>

								<FieldsetComponent label={'Character name'} isArrayItem={true}>

									<InputAndErrors
										value={character.name}
										errors={getIn(character, ['errors', 'name'])}
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
										value={character.underlyingName}
										errors={getIn(character, ['errors', 'underlyingName'])}
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
										value={character.differentiator}
										errors={getIn(character, ['errors', 'differentiator'])}
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
										value={character.qualifier}
										errors={getIn(character, ['errors', 'qualifier'])}
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

						const isLastListItem = checkIsLastArrayItem(index, characterGroups.length);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? handleAppendArrayItemClick(
												characterGroups,
												setCharacterGroups,
												statePath,
												event
											)
											: handleRemoveArrayItemClick(
												characterGroups,
												setCharacterGroups,
												statePath,
												event
											)
									}
								/>

								<FieldsetComponent label={'Group name'} isArrayItem={true}>

									<InputAndErrors
										value={characterGroup.name}
										errors={getIn(characterGroup, ['errors', 'name'])}
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

								{ renderCharacters(characterGroup.characters, statePath.concat(['characters'])) }

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

			<Fieldset header={'Differentiator'}>

				<InputAndErrors
					value={differentiator}
					errors={errors?.differentiator}
					handleChange={event => handleChange(differentiator, setDifferentiator, [], event)}
				/>

			</Fieldset>

			<Fieldset header={'Format'}>

				<InputAndErrors
					value={format}
					errors={errors?.format}
					handleChange={event => handleChange(format, setFormat, [], event)}
				/>

			</Fieldset>

			<Fieldset header={'Year'}>

				<InputAndErrors
					type={'number'}
					value={year}
					errors={errors?.year}
					handleChange={event => handleChange(year, setYear, [], event)}
				/>

			</Fieldset>

			<Fieldset header={'Original version material'}>

				<FieldsetComponent label={'Name'}>

					<InputAndErrors
						value={originalVersionMaterial?.name}
						errors={originalVersionMaterial && getIn(originalVersionMaterial, ['errors', 'name'])}
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
						value={originalVersionMaterial?.differentiator}
						errors={originalVersionMaterial && getIn(originalVersionMaterial, ['errors', 'differentiator'])}
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
