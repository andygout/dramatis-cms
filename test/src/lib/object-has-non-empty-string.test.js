import { expect } from 'chai';

import objectHasNonEmptyString from '../../../src/lib/object-has-non-empty-string.js';

describe('Object Has Non-Empty String module', () => {

	context('non-empty string exists', () => {

		context('non-empty string is value of displayed attribute', () => {

			it('returns true when top level attribute is non-empty string', () => {

				const object = {
					foo: 'string',
					bar: {
						baz: '',
						qux: [
							{
								quux: ''
							}
						]
					},
					quuz: [
						{
							corge: ''
						}
					]
				};

				const result = objectHasNonEmptyString(object);

				expect(result).to.be.true;

			});

			it('returns true when nested level attribute is non-empty string', () => {

				const object = {
					foo: '',
					bar: {
						baz: 'string',
						qux: [
							{
								quux: ''
							}
						]
					},
					quuz: [
						{
							corge: ''
						}
					]
				};

				const result = objectHasNonEmptyString(object);

				expect(result).to.be.true;

			});

			it('returns true when top level array object attribute is non-empty string', () => {

				const object = {
					foo: '',
					bar: {
						baz: '',
						qux: [
							{
								quux: ''
							}
						]
					},
					quuz: [
						{
							corge: 'string'
						}
					]
				};

				const result = objectHasNonEmptyString(object);

				expect(result).to.be.true;

			});

			it('returns true when nested level array object attribute is non-empty string', () => {

				const object = {
					foo: '',
					bar: {
						baz: '',
						qux: [
							{
								quux: 'string'
							}
						]
					},
					quuz: [
						{
							corge: ''
						}
					]
				};

				const result = objectHasNonEmptyString(object);

				expect(result).to.be.true;

			});

		});

		context('non-empty string is value of concealed attribute (e.g. \'model\')', () => {

			it('returns false when top level attribute is non-empty string', () => {

				const object = {
					model: 'string',
					bar: {
						baz: '',
						qux: [
							{
								quux: ''
							}
						]
					},
					quuz: [
						{
							corge: ''
						}
					]
				};

				const result = objectHasNonEmptyString(object);

				expect(result).to.be.false;

			});

			it('returns false when nested level attribute is non-empty string', () => {

				const object = {
					foo: '',
					bar: {
						model: 'string',
						qux: [
							{
								quux: ''
							}
						]
					},
					quuz: [
						{
							corge: ''
						}
					]
				};

				const result = objectHasNonEmptyString(object);

				expect(result).to.be.false;

			});

			it('returns false when top level array object attribute is non-empty string', () => {

				const object = {
					foo: '',
					bar: {
						baz: '',
						qux: [
							{
								quux: ''
							}
						]
					},
					quuz: [
						{
							model: 'string'
						}
					]
				};

				const result = objectHasNonEmptyString(object);

				expect(result).to.be.false;

			});

			it('returns false when nested level array object attribute is non-empty string', () => {

				const object = {
					foo: '',
					bar: {
						baz: '',
						qux: [
							{
								model: 'string'
							}
						]
					},
					quuz: [
						{
							corge: ''
						}
					]
				};

				const result = objectHasNonEmptyString(object);

				expect(result).to.be.false;

			});

		});

	});

	context('non-empty string does not exist', () => {

		it('returns false when non-empty string does not exist at any level', () => {

			const object = {
				foo: '',
				bar: {
					baz: '',
					qux: [
						{
							quux: ''
						}
					]
				},
				quuz: [
					{
						corge: ''
					}
				]
			};

			const result = objectHasNonEmptyString(object);

			expect(result).to.be.false;

		});

	});

});
