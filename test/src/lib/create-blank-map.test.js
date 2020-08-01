import { expect } from 'chai';
import { fromJS } from 'immutable';

import createBlankMap from '../../../src/lib/create-blank-map';

describe('Create Blank Map module', () => {

	it('converts strings to empty strings for top level attributes', () => {

		const map = fromJS(
			{
				foo: 'string',
			}
		);

		const result = createBlankMap(map);

		const expectation =
			{
				foo: ''
			};

		expect(result.toJS()).to.deep.eq(expectation);

	});

	it('converts strings to empty strings for nested level attributes', () => {

		const map = fromJS(
			{
				foo: {
					bar: 'string'
				}
			}
		);

		const result = createBlankMap(map);

		const expectation =
			{
				foo: {
					bar: ''
				}
			};

		expect(result.toJS()).to.deep.eq(expectation);

	});

	it('converts strings to empty strings for top level array object attributes', () => {

		const map = fromJS(
			{
				foo: [
					{
						bar: 'string'
					}
				]
			}
		);

		const result = createBlankMap(map);

		const expectation =
			{
				foo: [
					{
						bar: ''
					}
				]
			};

		expect(result.toJS()).to.deep.eq(expectation);

	});

	it('converts strings to empty strings for nested level array object attributes', () => {

		const map = fromJS(
			{
				foo: {
					bar: [
						{
							baz: 'string'
						}
					]
				}
			}
		);

		const result = createBlankMap(map);

		const expectation =
			{
				foo: {
					bar: [
						{
							baz: ''
						}
					]
				}
			};

		expect(result.toJS()).to.deep.eq(expectation);

	});

	it('converts top level arrays to single item arrays with empty string values', () => {

		const map = fromJS(
			{
				foo: [
					{
						bar: 'string'
					},
					{
						bar: 'string'
					}
				]
			}
		);

		const result = createBlankMap(map);

		const expectation =
			{
				foo: [
					{
						bar: ''
					}
				]
			};

		expect(result.toJS()).to.deep.eq(expectation);

	});

	it('converts nested level arrays to single item arrays with empty string values', () => {

		const map = fromJS(
			{
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
			}
		);

		const result = createBlankMap(map);

		const expectation =
			{
				foo: {
					bar: [
						{
							baz: ''
						}
					]
				}
			};

		expect(result.toJS()).to.deep.eq(expectation);

	});

});
