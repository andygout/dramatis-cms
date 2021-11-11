import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { ArrayItemActionButton, Fieldset, FieldsetComponent, Form, FormWrapper, InputAndErrors } from '../form';
import { createInstance, updateInstance, deleteInstance } from '../../../redux/actions/model';

class VenueForm extends Form {

	renderSubVenues (subVenues) {

		return (
			<Fieldset header={'Sub-venues'}>

				{
					subVenues?.map((subVenue, index) => {

						const statePath = ['subVenues', index];

						const isLastListItem = this.isLastListItem(index, subVenues.size);

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
										value={subVenue.get('name')}
										errors={subVenue.getIn(['errors', 'name'])}
										handleChange={event => this.handleChange(statePath.concat(['name']), event)}
									/>

								</FieldsetComponent>

								<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

									<InputAndErrors
										value={subVenue.get('differentiator')}
										errors={subVenue.getIn(['errors', 'differentiator'])}
										handleChange={event => this.handleChange(statePath.concat(['differentiator']), event)}
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

				<Fieldset header={'Differentiator'}>

					<InputAndErrors
						value={this.state.differentiator}
						errors={this.state.errors?.get('differentiator')}
						handleChange={event => this.handleChange(['differentiator'], event)}
					/>

				</Fieldset>

				{ Boolean(this.state.subVenues) && this.renderSubVenues(this.state.subVenues) }

			</FormWrapper>
		);

	}

}

VenueForm.propTypes = {
	venue: PropTypes.instanceOf(Map).isRequired,
	venueFormData: PropTypes.instanceOf(Map).isRequired
};

const mapStateToProps = state => ({
	venue: state.get('venue'),
	venueFormData: state.get('venueFormData')
});

export default connect(mapStateToProps, { createInstance, updateInstance, deleteInstance })(VenueForm);
