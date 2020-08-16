import { expect } from 'chai';
import { fromJS } from 'immutable';

import createBlankMap from '../../../src/lib/create-blank-map';

describe('Create Blank Map module', () => {

	describe('\'errors\' attribute values', () => {

		it('converts populated maps to empty maps for top level \'errors\' values', () => {

			const map = fromJS({
				errors: {
					name: [
						'Name is too long'
					]
				}
			});

			const result = createBlankMap(map);

			const expectation = {
				errors: {}
			};

			expect(result.toJS()).to.deep.equal(expectation);

		});

		it('converts populated maps to empty maps for nested level \'errors\' values', () => {

			const map = fromJS({
				foo: {
					errors: {
						name: [
							'Name is too long'
						]
					}
				}
			});

			const result = createBlankMap(map);

			const expectation = {
				foo: {
					errors: {}
				}
			};

			expect(result.toJS()).to.deep.equal(expectation);

		});

	});

	describe('\'model\' attribute values', () => {

		it('retains value for top level \'model\' values', () => {

			const map = fromJS({
				model: 'person'
			});

			const result = createBlankMap(map);

			const expectation = {
				model: 'person'
			};

			expect(result.toJS()).to.deep.equal(expectation);

		});

		it('retains value for nested level \'model\' values', () => {

			const map = fromJS({
				foo: {
					model: 'person'
				}
			});

			const result = createBlankMap(map);

			const expectation = {
				foo: {
					model: 'person'
				}
			};

			expect(result.toJS()).to.deep.equal(expectation);

		});

	});

	describe('all other attribute values', () => {

		it('converts strings to empty strings for top level attributes', () => {

			const map = fromJS({
				foo: 'string',
			});

			const result = createBlankMap(map);

			const expectation = {
				foo: ''
			};

			expect(result.toJS()).to.deep.equal(expectation);

		});

		it('converts strings to empty strings for nested level attributes', () => {

			const map = fromJS({
				foo: {
					bar: 'string'
				}
			});

			const result = createBlankMap(map);

			const expectation = {
				foo: {
					bar: ''
				}
			};

			expect(result.toJS()).to.deep.equal(expectation);

		});

		it('converts strings to empty strings for top level array object attributes', () => {

			const map = fromJS({
				foo: [
					{
						bar: 'string'
					}
				]
			});

			const result = createBlankMap(map);

			const expectation = {
				foo: [
					{
						bar: ''
					}
				]
			};

			expect(result.toJS()).to.deep.equal(expectation);

		});

		it('converts strings to empty strings for nested level array object attributes', () => {

			const map = fromJS({
				foo: {
					bar: [
						{
							baz: 'string'
						}
					]
				}
			});

			const result = createBlankMap(map);

			const expectation = {
				foo: {
					bar: [
						{
							baz: ''
						}
					]
				}
			};

			expect(result.toJS()).to.deep.equal(expectation);

		});

		it('converts top level arrays to single item arrays with empty string values', () => {

			const map = fromJS({
				foo: [
					{
						bar: 'string'
					},
					{
						bar: 'string'
					}
				]
			});

			const result = createBlankMap(map);

			const expectation = {
				foo: [
					{
						bar: ''
					}
				]
			};

			expect(result.toJS()).to.deep.equal(expectation);

		});

		it('converts nested level arrays to single item arrays with empty string values', () => {

			const map = fromJS({
				foo: {
					bar: [
						{
							baz: 'string'
						},
						{
							baz: 'string'
						}
					]
				}
			});

			const result = createBlankMap(map);

			const expectation = {
				foo: {
					bar: [
						{
							baz: ''
						}
					]
				}
			};

			expect(result.toJS()).to.deep.equal(expectation);

		});

	});

});
