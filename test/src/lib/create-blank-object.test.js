import { expect } from 'chai';

import createBlankObject from '../../../src/lib/create-blank-object';

describe('Create Blank Object module', () => {

	describe('\'errors\' attribute values', () => {

		it('converts populated objects to empty objects for top level \'errors\' values', () => {

			const object = {
				errors: {
					name: [
						'Name is too long'
					]
				}
			};

			const result = createBlankObject(object);

			const expectation = {
				errors: {}
			};

			expect(result).to.deep.equal(expectation);

		});

		it('converts populated objects to empty objects for nested level \'errors\' values', () => {

			const object = {
				foo: {
					errors: {
						name: [
							'Name is too long'
						]
					}
				}
			};

			const result = createBlankObject(object);

			const expectation = {
				foo: {
					errors: {}
				}
			};

			expect(result).to.deep.equal(expectation);

		});

	});

	describe('\'model\' attribute values', () => {

		it('retains value for top level \'model\' values', () => {

			const object = {
				model: 'PERSON'
			};

			const result = createBlankObject(object);

			const expectation = {
				model: 'PERSON'
			};

			expect(result).to.deep.equal(expectation);

		});

		it('retains value for nested level \'model\' values', () => {

			const object = {
				foo: {
					model: 'PERSON'
				}
			};

			const result = createBlankObject(object);

			const expectation = {
				foo: {
					model: 'PERSON'
				}
			};

			expect(result).to.deep.equal(expectation);

		});

	});

	describe('all other attribute values', () => {

		it('converts strings to empty strings for top level attributes', () => {

			const object = {
				foo: 'string'
			};

			const result = createBlankObject(object);

			const expectation = {
				foo: ''
			};

			expect(result).to.deep.equal(expectation);

		});

		it('converts strings to empty strings for nested level attributes', () => {

			const object = {
				foo: {
					bar: 'string'
				}
			};

			const result = createBlankObject(object);

			const expectation = {
				foo: {
					bar: ''
				}
			};

			expect(result).to.deep.equal(expectation);

		});

		it('converts strings to empty strings for top level array object attributes', () => {

			const object = {
				foo: [
					{
						bar: 'string'
					}
				]
			};

			const result = createBlankObject(object);

			const expectation = {
				foo: [
					{
						bar: ''
					}
				]
			};

			expect(result).to.deep.equal(expectation);

		});

		it('converts strings to empty strings for nested level array object attributes', () => {

			const object = {
				foo: {
					bar: [
						{
							baz: 'string'
						}
					]
				}
			};

			const result = createBlankObject(object);

			const expectation = {
				foo: {
					bar: [
						{
							baz: ''
						}
					]
				}
			};

			expect(result).to.deep.equal(expectation);

		});

		it('converts top level arrays to single item arrays with empty string values', () => {

			const object = {
				foo: [
					{
						bar: 'string'
					},
					{
						bar: 'string'
					}
				]
			};

			const result = createBlankObject(object);

			const expectation = {
				foo: [
					{
						bar: ''
					}
				]
			};

			expect(result).to.deep.equal(expectation);

		});

		it('converts nested level arrays to single item arrays with empty string values', () => {

			const object = {
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
			};

			const result = createBlankObject(object);

			const expectation = {
				foo: {
					bar: [
						{
							baz: ''
						}
					]
				}
			};

			expect(result).to.deep.equal(expectation);

		});

	});

});
