import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { ArrayItemRemovalButton, Fieldset, FieldsetComponent, Form, FormWrapper, InputAndErrors } from '../form';
import { createInstance, updateInstance, deleteInstance } from '../../../redux/actions/model';

class VenueForm extends Form {

	renderSubVenues (subVenues) {

		return (
			<Fieldset header={'Sub-venues'}>

				{
					subVenues?.map((subVenue, index) =>
						<div className={'fieldset__module'} key={index}>

							<ArrayItemRemovalButton
								isRemovalButtonRequired={this.isRemovalButtonRequired(index, subVenues.size)}
								handleRemovalClick={event => this.handleRemovalClick(['subVenues', index], event)}
							/>

							<FieldsetComponent label={'Name'} isArrayItem={true}>

								<InputAndErrors
									value={subVenue.get('name')}
									errors={subVenue.getIn(['errors', 'name'])}
									handleChange={event => this.handleChange(['subVenues', index, 'name'], event)}
								/>

							</FieldsetComponent>

							<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

								<InputAndErrors
									value={subVenue.get('differentiator')}
									errors={subVenue.getIn(['errors', 'differentiator'])}
									handleChange={event => this.handleChange(['subVenues', index, 'differentiator'], event)}
								/>

							</FieldsetComponent>

						</div>
					)
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

				{ !!this.state.subVenues && this.renderSubVenues(this.state.subVenues) }

			</FormWrapper>
		);

	}

}

VenueForm.propTypes = {
	venue: ImmutablePropTypes.map.isRequired,
	venueFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	venue: state.get('venue'),
	venueFormData: state.get('venueFormData')
});

export default connect(mapStateToProps, { createInstance, updateInstance, deleteInstance })(VenueForm);
