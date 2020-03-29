import { expect } from 'chai';

import camelCaseToSentenceCase from '../../../src/lib/camel-case-to-sentence-case';

describe('Camel Case To Sentence Case module', () => {

	it('converts single word camel-cased values to sentence case', () => {

		const result = camelCaseToSentenceCase('name');

		expect(result).to.eq('Name');

	});

	it('converts multi-word camel-cased values to sentence case', () => {

		const result = camelCaseToSentenceCase('characterName');

		expect(result).to.eq('Character name');

	});

});
