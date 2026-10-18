import { useEffect, useState } from 'react';

import { capitalise } from '../../../lib/strings.js';
import {
	useCreateAwardCeremonyMutation,
	useUpdateAwardCeremonyMutation,
	useDeleteAwardCeremonyMutation
} from '../../../redux/slices/api.js';
import { MODELS } from '../../../utils/constants.js';
import {
	handleChange,
	checkIsLastArrayItem,
	handleAppendArrayItemClick,
	handleRemoveArrayItemClick,
	handleChangeToPerson,
	handleChangeToCompany
} from '../../utils/form.js';
import { ArrayItemActionButton, Fieldset, FieldsetComponent, FormWrapper, InputAndErrors } from '../form/index.js';

const AwardCeremonyForm = (props) => {
	const { instance, action } = props;

	const [createAwardCeremony] = useCreateAwardCeremonyMutation();
	const [updateAwardCeremony] = useUpdateAwardCeremonyMutation();
	const [deleteAwardCeremony] = useDeleteAwardCeremonyMutation();

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

	const renderMembers = (members, membersStatePath, fieldIdBase) => {
		return (
			<FieldsetComponent label={'Nominated company members (people)'} isArrayItem={true}>
				{members.map((member, index) => {
					const statePath = membersStatePath.concat([index]);

					const isLastListItem = checkIsLastArrayItem(index, members.length);

					return (
						<div className={'fieldset__module fieldset__module--nested'} key={index}>
							<ArrayItemActionButton
								isLastListItem={isLastListItem}
								handleClick={(event) =>
									isLastListItem
										? handleAppendArrayItemClick(categories, setCategories, statePath, event)
										: handleRemoveArrayItemClick(categories, setCategories, statePath, event)
								}
							/>

							<FieldsetComponent
								fieldId={[fieldIdBase, ...statePath, 'name'].join('-')}
								label={'Person name'}
								isArrayItem={true}
							>
								<InputAndErrors
									value={member.name}
									errors={member.errors.name}
									handleChange={(event) =>
										handleChange(categories, setCategories, statePath.concat(['name']), event)
									}
								/>
							</FieldsetComponent>

							<FieldsetComponent
								fieldId={[fieldIdBase, ...statePath, 'differentiator'].join('-')}
								label={'Differentiator'}
								isArrayItem={true}
							>
								<InputAndErrors
									value={member.differentiator}
									errors={member.errors.differentiator}
									handleChange={(event) =>
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
				})}
			</FieldsetComponent>
		);
	};

	const renderMaterials = (materials, materialsStatePath, fieldIdBase) => {
		return (
			<FieldsetComponent label={'Nominated materials'} isArrayItem={true}>
				{materials.map((material, index) => {
					const statePath = materialsStatePath.concat([index]);

					const isLastListItem = checkIsLastArrayItem(index, materials.length);

					return (
						<div className={'fieldset__module fieldset__module--nested'} key={index}>
							<ArrayItemActionButton
								isLastListItem={isLastListItem}
								handleClick={(event) =>
									isLastListItem
										? handleAppendArrayItemClick(categories, setCategories, statePath, event)
										: handleRemoveArrayItemClick(categories, setCategories, statePath, event)
								}
							/>

							<FieldsetComponent
								fieldId={[fieldIdBase, ...statePath, 'name'].join('-')}
								label={'Material name'}
								isArrayItem={true}
							>
								<InputAndErrors
									value={material.name}
									errors={material.errors.name}
									handleChange={(event) =>
										handleChange(categories, setCategories, statePath.concat(['name']), event)
									}
								/>
							</FieldsetComponent>

							<FieldsetComponent
								fieldId={[fieldIdBase, ...statePath, 'differentiator'].join('-')}
								label={'Differentiator'}
								isArrayItem={true}
							>
								<InputAndErrors
									value={material.differentiator}
									errors={material.errors.differentiator}
									handleChange={(event) =>
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
				})}
			</FieldsetComponent>
		);
	};

	const renderProductions = (productions, productionsStatePath, fieldIdBase) => {
		return (
			<FieldsetComponent label={'Nominated productions'} isArrayItem={true}>
				{productions.map((production, index) => {
					const statePath = productionsStatePath.concat([index]);

					const isLastListItem = checkIsLastArrayItem(index, productions.length);

					return (
						<div className={'fieldset__module fieldset__module--nested'} key={index}>
							<ArrayItemActionButton
								isLastListItem={isLastListItem}
								handleClick={(event) =>
									isLastListItem
										? handleAppendArrayItemClick(categories, setCategories, statePath, event)
										: handleRemoveArrayItemClick(categories, setCategories, statePath, event)
								}
							/>

							<FieldsetComponent
								fieldId={[fieldIdBase, ...statePath, 'uuid'].join('-')}
								label={'Production UUID'}
								isArrayItem={true}
							>
								<InputAndErrors
									value={production.uuid}
									errors={production.errors.uuid}
									handleChange={(event) =>
										handleChange(categories, setCategories, statePath.concat(['uuid']), event)
									}
								/>
							</FieldsetComponent>
						</div>
					);
				})}
			</FieldsetComponent>
		);
	};

	const renderEntities = (entities, entitiesStatePath, fieldIdBase) => {
		return (
			<FieldsetComponent label={'Nominated entities (people, companies)'} isArrayItem={true}>
				{entities.map((entity, index) => {
					const statePath = entitiesStatePath.concat([index]);

					const isLastListItem = checkIsLastArrayItem(index, entities.length);

					return (
						<div className={'fieldset__module fieldset__module--nested'} key={index}>
							<ArrayItemActionButton
								isLastListItem={isLastListItem}
								handleClick={(event) =>
									isLastListItem
										? handleAppendArrayItemClick(categories, setCategories, statePath, event)
										: handleRemoveArrayItemClick(categories, setCategories, statePath, event)
								}
							/>

							<FieldsetComponent
								fieldId={[fieldIdBase, ...statePath, 'name'].join('-')}
								label={`${capitalise(entity.model)} name`}
								isArrayItem={true}
							>
								<InputAndErrors
									value={entity.name}
									errors={entity.errors.name}
									handleChange={(event) =>
										handleChange(categories, setCategories, statePath.concat(['name']), event)
									}
								/>
							</FieldsetComponent>

							<FieldsetComponent
								fieldId={[fieldIdBase, ...statePath, 'differentiator'].join('-')}
								label={'Differentiator'}
								isArrayItem={true}
							>
								<InputAndErrors
									value={entity.differentiator}
									errors={entity.errors.differentiator}
									handleChange={(event) =>
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
									id={[fieldIdBase, ...statePath, 'model', 'person'].join('-')}
									type={'radio'}
									value={MODELS.PERSON}
									checked={entity.model === MODELS.PERSON}
									onChange={(event) =>
										handleChangeToPerson(categories, setCategories, statePath, entity, event)
									}
								/>
								<label htmlFor={[fieldIdBase, ...statePath, 'model', 'person'].join('-')}>
									{'Person'}
								</label>

								<input
									id={[fieldIdBase, ...statePath, 'model', 'company'].join('-')}
									type={'radio'}
									value={MODELS.COMPANY}
									checked={entity.model === MODELS.COMPANY}
									onChange={(event) =>
										handleChangeToCompany(categories, setCategories, statePath, entity, event)
									}
								/>
								<label htmlFor={[fieldIdBase, ...statePath, 'model', 'company'].join('-')}>
									{'Company'}
								</label>
							</FieldsetComponent>

							{entity.model === MODELS.COMPANY &&
								renderMembers(entity.members || [], statePath.concat(['members']), fieldIdBase)}
						</div>
					);
				})}
			</FieldsetComponent>
		);
	};

	const renderNominations = (nominations, nominationsStatePath, fieldIdBase) => {
		return (
			<FieldsetComponent label={'Nominations'} isArrayItem={true}>
				{nominations.map((nomination, index) => {
					const statePath = nominationsStatePath.concat([index]);

					const isLastListItem = checkIsLastArrayItem(index, nominations.length);

					return (
						<div className={'fieldset__module fieldset__module--nested'} key={index}>
							<FieldsetComponent
								fieldId={[fieldIdBase, ...statePath, 'is-winner'].join('-')}
								label={'Winner'}
								isArrayItem={true}
							>
								<input
									id={[fieldIdBase, ...statePath, 'is-winner'].join('-')}
									type="checkbox"
									checked={nomination.isWinner}
									onChange={(event) =>
										handleChange(categories, setCategories, statePath.concat(['isWinner']), event)
									}
								/>
							</FieldsetComponent>

							<FieldsetComponent
								fieldId={[fieldIdBase, ...statePath, 'custom-type'].join('-')}
								label={'Custom type'}
							>
								<InputAndErrors
									value={nomination.customType}
									errors={nomination.errors.customType}
									handleChange={(event) =>
										handleChange(categories, setCategories, statePath.concat(['customType']), event)
									}
								/>
							</FieldsetComponent>

							<ArrayItemActionButton
								isLastListItem={isLastListItem}
								handleClick={(event) =>
									isLastListItem
										? handleAppendArrayItemClick(categories, setCategories, statePath, event)
										: handleRemoveArrayItemClick(categories, setCategories, statePath, event)
								}
							/>

							{renderEntities(nomination.entities, statePath.concat('entities'), fieldIdBase)}

							{renderProductions(nomination.productions, statePath.concat('productions'), fieldIdBase)}

							{renderMaterials(nomination.materials, statePath.concat('materials'), fieldIdBase)}
						</div>
					);
				})}
			</FieldsetComponent>
		);
	};

	const renderCategories = () => {
		return (
			<Fieldset header={'Categories'}>
				{categories?.map((category, index) => {
					const statePath = [index];

					const isLastListItem = checkIsLastArrayItem(index, categories.length);

					return (
						<div className={'fieldset__module'} key={index}>
							<ArrayItemActionButton
								isLastListItem={isLastListItem}
								handleClick={(event) =>
									isLastListItem
										? handleAppendArrayItemClick(categories, setCategories, statePath, event)
										: handleRemoveArrayItemClick(categories, setCategories, statePath, event)
								}
							/>

							<FieldsetComponent
								fieldId={['categories', ...statePath, 'name'].join('-')}
								label={'Category name'}
								isArrayItem={true}
							>
								<InputAndErrors
									value={category.name}
									errors={category.errors.name}
									handleChange={(event) =>
										handleChange(categories, setCategories, statePath.concat(['name']), event)
									}
								/>
							</FieldsetComponent>

							{renderNominations(category.nominations, statePath.concat(['nominations']), 'categories')}
						</div>
					);
				})}
			</Fieldset>
		);
	};

	return (
		<FormWrapper
			action={action}
			instance={actionableInstance}
			createInstance={createAwardCeremony}
			updateInstance={updateAwardCeremony}
			deleteInstance={deleteAwardCeremony}
		>
			<Fieldset header={'Name'}>
				<InputAndErrors
					value={name}
					errors={errors?.name}
					handleChange={(event) => handleChange(name, setName, [], event)}
				/>
			</Fieldset>

			<Fieldset header={'Award'}>
				<FieldsetComponent fieldId={'award-name'} label={'Name'}>
					<InputAndErrors
						value={award?.name}
						errors={award?.errors.name}
						handleChange={(event) => handleChange(award, setAward, ['name'], event)}
					/>
				</FieldsetComponent>

				<FieldsetComponent fieldId={'award-differentiator'} label={'Differentiator'}>
					<InputAndErrors
						value={award?.differentiator}
						errors={award?.errors.differentiator}
						handleChange={(event) => handleChange(award, setAward, ['differentiator'], event)}
					/>
				</FieldsetComponent>
			</Fieldset>

			{Boolean(categories) && renderCategories()}
		</FormWrapper>
	);
};

export default AwardCeremonyForm;
