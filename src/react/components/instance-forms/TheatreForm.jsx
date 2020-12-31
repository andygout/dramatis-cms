import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { ArrayItemRemovalButton, Fieldset, FieldsetComponent, Form, FormWrapper, InputAndErrors } from '../form';
import { createInstance, updateInstance, deleteInstance } from '../../../redux/actions/model';

class TheatreForm extends Form {

	renderSubTheatres (subTheatres) {

		return (
			<Fieldset header={'Sub-theatres'}>

				{
					subTheatres?.map((subTheatre, index) =>
						<div className={'fieldset__module'} key={index}>

							<ArrayItemRemovalButton
								isRemovalButtonRequired={this.isRemovalButtonRequired(index, subTheatres.size)}
								handleRemovalClick={event => this.handleRemovalClick(['subTheatres', index], event)}
							/>

							<FieldsetComponent label={'Name'} isArrayItem={true}>

								<InputAndErrors
									value={subTheatre.get('name')}
									errors={subTheatre.getIn(['errors', 'name'])}
									handleChange={event => this.handleChange(['subTheatres', index, 'name'], event)}
								/>

							</FieldsetComponent>

							<FieldsetComponent label={'Differentiator'} isArrayItem={true}>

								<InputAndErrors
									value={subTheatre.get('differentiator')}
									errors={subTheatre.getIn(['errors', 'differentiator'])}
									handleChange={event => this.handleChange(['subTheatres', index, 'differentiator'], event)}
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

				{ !!this.state.subTheatres && this.renderSubTheatres(this.state.subTheatres) }

			</FormWrapper>
		);

	}

}

TheatreForm.propTypes = {
	theatre: ImmutablePropTypes.map.isRequired,
	theatreFormData: ImmutablePropTypes.map.isRequired
};

const mapStateToProps = state => ({
	theatre: state.get('theatre'),
	theatreFormData: state.get('theatreFormData')
});

export default connect(mapStateToProps, { createInstance, updateInstance, deleteInstance })(TheatreForm);
