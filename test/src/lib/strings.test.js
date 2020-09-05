import { expect } from 'chai';

import { camelCaseToSentenceCase, capitalise, pluralise } from '../../../src/lib/strings';

describe('Strings module', () => {

	describe('camelCaseToSentenceCase function', () => {

		it('converts single word camel-cased values to sentence case', () => {

			const result = camelCaseToSentenceCase('name');

			expect(result).to.equal('Name');

		});

		it('converts multi-word camel-cased values to sentence case', () => {

			const result = camelCaseToSentenceCase('characterName');

			expect(result).to.equal('Character name');

		});

	});

	describe('capitalise function', () => {

		context('input string is lowercase', () => {

			it('returns string with initial letter as capital', () => {

				expect(capitalise('string')).to.equal('String');

			});

		});

		context('input string is uppercase', () => {

			it('returns string with initial letter as capital', () => {

				expect(capitalise('STRING')).to.equal('String');

			});

		});

	});

	describe('pluralise function', () => {

		context('model has regular plural noun', () => {

			it('returns singular noun with appended \'s\'', () => {

				expect(pluralise('production')).to.equal('productions');

			});

		});

		context('model has irregular plural noun', () => {

			it('returns specific plural noun', () => {

				expect(pluralise('person')).to.equal('people');

			});

		});

	});

});
