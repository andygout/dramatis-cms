import { expect } from 'chai';

import pruneInstance from '../../../src/lib/prune-instance';

describe('Prune Instance module', () => {

	it('removes top-level concealed attributes (e.g. \'errors\')', () => {

		const instance = {
			name: 'King Lear',
			errors: {}
		};

		const result = pruneInstance(instance);

		const expectation = {
			name: 'King Lear'
		};

		expect(result).to.deep.equal(expectation);

	});

	it('retains top-level \'model\' and \'uuid\' attributes', () => {

		const instance = {
			model: 'PRODUCTION',
			uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
			name: 'King Lear'
		};

		const result = pruneInstance(instance);

		const expectation = {
			model: 'PRODUCTION',
			uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
			name: 'King Lear'
		};

		expect(result).to.deep.equal(expectation);

	});

	it('removes nested-level concealed attributes (e.g. \'errors\', and \'model\')', () => {

		const instance = {
			name: 'King Lear',
			cast: [
				{
					model: 'PERSON',
					name: 'Ian McKellen',
					errors: {},
					roles: [
						{
							model: 'ROLE',
							name: 'King Lear',
							characterName: '',
							errors: {}
						}
					]
				}
			]
		};

		const result = pruneInstance(instance);

		const expectation = {
			name: 'King Lear',
			cast: [
				{
					model: 'PERSON',
					name: 'Ian McKellen',
					roles: [
						{
							model: 'ROLE',
							name: 'King Lear',
							characterName: ''
						}
					]
				}
			]
		};

		expect(result).to.deep.equal(expectation);

	});

	describe('filters out array items that have empty string name', () => {

		context('array items with non-empty strings exist', () => {

			it('filters out array items that have empty string name values', () => {

				const instance = {
					name: 'King Lear',
					cast: [
						{
							name: 'Ian McKellen',
							roles: [
								{
									name: 'King Lear',
									characterName: ''
								},
								{
									name: '',
									characterName: ''
								}
							]
						},
						{
							name: '',
							roles: [
								{
									name: '',
									characterName: ''
								}
							]
						}
					]
				};

				const result = pruneInstance(instance);

				const expectation = {
					name: 'King Lear',
					cast: [
						{
							name: 'Ian McKellen',
							roles: [
								{
									name: 'King Lear',
									characterName: ''
								}
							]
						}
					]
				};

				expect(result).to.deep.equal(expectation);

			});

		});

		context('array items with non-empty strings do not exist', () => {

			it('leaves single array item that has empty string name value', () => {

				const instance = {
					name: 'King Lear',
					cast: [
						{
							name: '',
							roles: [
								{
									name: '',
									characterName: ''
								}
							]
						}
					]
				};

				const result = pruneInstance(instance);

				const expectation = {
					name: 'King Lear',
					cast: [
						{
							name: '',
							roles: [
								{
									name: '',
									characterName: ''
								}
							]
						}
					]
				};

				expect(result).to.deep.equal(expectation);

			});

		});

	});

	describe('filters out array items that have empty string uuid', () => {

		context('array items with non-empty strings exist', () => {

			it('filters out array items that have empty string uuid values', () => {

				const instance = {
					name: '2020',
					productions: [
						{
							uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
						},
						{
							uuid: ''
						}
					]
				};

				const result = pruneInstance(instance);

				const expectation = {
					name: '2020',
					productions: [
						{
							uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
						}
					]
				};

				expect(result).to.deep.equal(expectation);

			});

		});

		context('array items with non-empty strings do not exist', () => {

			it('leaves single array item that has empty string name value', () => {

				const instance = {
					name: '2020',
					productions: [
						{
							uuid: ''
						}
					]
				};

				const result = pruneInstance(instance);

				const expectation = {
					name: '2020',
					productions: [
						{
							uuid: ''
						}
					]
				};

				expect(result).to.deep.equal(expectation);

			});

		});

	});

	it('retains array items that do not have name or uuid property (i.e. each item in nominations array)', () => {

		const instance = {
			name: '2019',
			categories: [
				{
					name: 'Best Actor',
					nominations: [
						{
							entities: [
								{
									name: 'Ian McKellen'
								}
							]
						},
						{
							entities: [
								{
									name: 'David Suchet'
								}
							]
						}
					]
				}
			]
		};

		const result = pruneInstance(instance);

		const expectation = {
			name: '2019',
			categories: [
				{
					name: 'Best Actor',
					nominations: [
						{
							entities: [
								{
									name: 'Ian McKellen'
								}
							]
						},
						{
							entities: [
								{
									name: 'David Suchet'
								}
							]
						}
					]
				}
			]
		};

		expect(result).to.deep.equal(expectation);

	});

	it('prunes a sample production instance as per specification', () => {

		const instance = {
			model: 'PRODUCTION',
			uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
			name: 'King Lear',
			errors: {},
			material: {
				model: 'MATERIAL',
				name: '',
				format: '',
				errors: {}
			},
			venue: {
				model: 'VENUE',
				name: 'Courtyard Theatre',
				errors: {}
			},
			cast: [
				{
					model: 'PERSON',
					name: 'Ian McKellen',
					errors: {},
					roles: [
						{
							model: 'ROLE',
							name: 'King Lear',
							characterName: '',
							errors: {}
						},
						{
							model: 'ROLE',
							name: '',
							characterName: '',
							errors: {}
						}
					]
				},
				{
					model: 'PERSON',
					name: '',
					errors: {},
					roles: [
						{
							model: 'ROLE',
							name: '',
							characterName: '',
							errors: {}
						}
					]
				}
			]
		};

		const result = pruneInstance(instance);

		const expectation = {
			model: 'PRODUCTION',
			uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
			name: 'King Lear',
			material: {
				model: 'MATERIAL',
				name: '',
				format: ''
			},
			venue: {
				model: 'VENUE',
				name: 'Courtyard Theatre'
			},
			cast: [
				{
					model: 'PERSON',
					name: 'Ian McKellen',
					roles: [
						{
							model: 'ROLE',
							name: 'King Lear',
							characterName: ''
						}
					]
				}
			]
		};

		expect(result).to.deep.equal(expectation);

	});

	it('prunes a sample award ceremony instance as per specification', () => {

		const instance = {
			model: 'AWARD_CEREMONY',
			name: '',
			errors: {},
			award: {
				model: 'AWARD',
				name: '',
				differentiator: '',
				errors: {}
			},
			categories: [
				{
					model: 'AWARD_CEREMONY_CATEGORY',
					name: '',
					errors: {},
					nominations: [
						{
							model: 'NOMINATION',
							isWinner: false,
							errors: {},
							entities: [
								{
									model: 'PERSON',
									name: '',
									differentiator: '',
									errors: {}
								}
							],
							productions: [
								{
									model: 'PRODUCTION_IDENTIFIER',
									uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
									errors: {}
								},
								{
									model: 'PRODUCTION_IDENTIFIER',
									uuid: '',
									errors: {}
								}
							]
						}
					]
				}
			]
		};

		const result = pruneInstance(instance);

		const expectation = {
			model: 'AWARD_CEREMONY',
			name: '',
			award: {
				model: 'AWARD',
				name: '',
				differentiator: ''
			},
			categories: [
				{
					model: 'AWARD_CEREMONY_CATEGORY',
					name: '',
					nominations: [
						{
							model: 'NOMINATION',
							isWinner: false,
							entities: [
								{
									model: 'PERSON',
									name: '',
									differentiator: ''
								}
							],
							productions: [
								{
									model: 'PRODUCTION_IDENTIFIER',
									uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
								}
							]
						}
					]
				}
			]
		};

		expect(result).to.deep.equal(expectation);

	});

});
