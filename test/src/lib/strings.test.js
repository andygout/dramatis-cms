import { expect } from 'chai';

import { camelCaseToSentenceCase, capitalise, pluralise } from '../../../src/lib/strings';

describe('Strings module', () => {

	describe('Camel Case To Sentence Case function', () => {

		it('converts single word camel-cased values to sentence case', () => {

			const result = camelCaseToSentenceCase('name');

			expect(result).to.eq('Name');

		});

		it('converts multi-word camel-cased values to sentence case', () => {

			const result = camelCaseToSentenceCase('characterName');

			expect(result).to.eq('Character name');

		});

	});

	describe('Capitalise function', () => {

		context('Input string is lowercase', () => {

			it('returns string with initial letter as capital', () => {

				expect(capitalise('string')).to.eq('String');

			});

		});

		context('Input string is uppercase', () => {

			it('returns string with initial letter as capital', () => {

				expect(capitalise('STRING')).to.eq('String');

			});

		});

	});

	describe('Pluralise function', () => {

		context('Model has regular plural noun', () => {

			it('returns singular noun with appended \'s\'', () => {

				expect(pluralise('production')).to.eq('productions');

			});

		});

		context('Model has irregular plural noun', () => {

			it('returns specific plural noun', () => {

				expect(pluralise('person')).to.eq('people');

			});

		});

	});

});
