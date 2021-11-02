import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ArrayItemActionButton, Fieldset, FieldsetComponent, Form, FormWrapper, InputAndErrors } from '../form';
import { createInstance, updateInstance, deleteInstance } from '../../../redux/actions/model';

class AwardCeremonyForm extends Form {

	renderCategories (categories) {

		return (
			<Fieldset header={'Categories'}>

				{
					categories?.map((category, index) => {

						const statePath = ['categories', index];

						const isLastListItem = this.isLastListItem(index, categories.size);

						return (
							<div className={'fieldset__module'} key={index}>

								<ArrayItemActionButton
									isLastListItem={isLastListItem}
									handleClick={event =>
										isLastListItem
											? this.handleCreationClick(statePath, event)
											: this.handleRemovalClick(statePath, event)
									}
								/>

								<FieldsetComponent label={'Name'} isArrayItem={true}>

									<InputAndErrors
										value={category.get('name')}
										errors={category.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(statePath.concat(['name']), event)}
									/>

								</FieldsetComponent>

							</div>
						);

					})
				}

			</Fieldset>
		);

	}

	render () {

		if (this.props.redirectPath) return this.performRedirect();

		return (
			<FormWrapper
				action={this.props.action}
				handleSubmit={this.handleSubmit}
				handleDelete={this.handleDelete}
			>

				<Fieldset header={'Name'}>

					<InputAndErrors
						value={this.state.name}
						errors={this.state.errors?.get('name')}
						handleChange={event => this.handleChange(['name'], event)}
					/>

				</Fieldset>

				<Fieldset header={'Award'}>

					<FieldsetComponent label={'Name'}>

						<InputAndErrors
							value={this.state.award?.get('name')}
							errors={this.state.award?.getIn(['errors', 'name'])}
							handleChange={event => this.handleChange(['award', 'name'], event)}
						/>

					</FieldsetComponent>

					<FieldsetComponent label={'Differentiator'}>

						<InputAndErrors
							value={this.state.award?.get('differentiator')}
							errors={this.state.award?.getIn(['errors', 'differentiator'])}
							handleChange={event => this.handleChange(['award', 'differentiator'], event)}
						/>

					</FieldsetComponent>

				</Fieldset>

				{ Boolean(this.state.categories) && this.renderCategories(this.state.categories) }

			</FormWrapper>
		);

	}

}

AwardCeremonyForm.propTypes = {
	awardCeremony: PropTypes.instanceOf(Map).isRequired,
	awardCeremonyFormData: PropTypes.instanceOf(Map).isRequired
};

const mapStateToProps = state => ({
	awardCeremony: state.get('awardCeremony'),
	awardCeremonyFormData: state.get('awardCeremonyFormData')
});

export default connect(mapStateToProps, { createInstance, updateInstance, deleteInstance })(AwardCeremonyForm);
