import { expect } from 'chai';

import pruneInstance from '../../../src/lib/prune-instance';

describe('prune Instance module', () => {

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
			name: 'King Lear',
			model: 'PRODUCTION',
			uuid: 'b22157c0-4ecd-4bd9-b4fd-2656d3def80e'
		};

		const result = pruneInstance(instance);

		const expectation = {
			name: 'King Lear',
			model: 'PRODUCTION',
			uuid: 'b22157c0-4ecd-4bd9-b4fd-2656d3def80e'
		};

		expect(result).to.deep.equal(expectation);

	});

	it('removes nested-level concealed attributes (e.g. \'errors\', and \'model\')', () => {

		const instance = {
			name: 'King Lear',
			cast: [
				{
					name: 'Ian McKellen',
					errors: {},
					model: 'PERSON',
					roles: [
						{
							name: 'King Lear',
							errors: {},
							model: 'ROLE',
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
							uuid: 'b22157c0-4ecd-4bd9-b4fd-2656d3def80e'
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
							uuid: 'b22157c0-4ecd-4bd9-b4fd-2656d3def80e'
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
			name: 'King Lear',
			errors: {},
			model: 'PRODUCTION',
			uuid: 'b22157c0-4ecd-4bd9-b4fd-2656d3def80e',
			venue: {
				name: 'Courtyard Theatre',
				errors: {},
				model: 'VENUE'
			},
			material: {
				model: 'MATERIAL',
				name: '',
				format: '',
				errors: {}
			},
			cast: [
				{
					name: 'Ian McKellen',
					errors: {},
					model: 'PERSON',
					roles: [
						{
							name: 'King Lear',
							errors: {},
							model: 'ROLE',
							characterName: ''
						},
						{
							name: '',
							errors: {},
							model: 'ROLE',
							characterName: ''
						}
					]
				},
				{
					name: '',
					errors: {},
					model: 'PERSON',
					roles: [
						{
							name: '',
							errors: {},
							model: 'ROLE',
							characterName: ''
						}
					]
				}
			]
		};

		const result = pruneInstance(instance);

		const expectation = {
			name: 'King Lear',
			model: 'PRODUCTION',
			uuid: 'b22157c0-4ecd-4bd9-b4fd-2656d3def80e',
			venue: {
				name: 'Courtyard Theatre'
			},
			material: {
				name: '',
				format: ''
			},
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

	it('prunes a sample award ceremony instance as per specification', () => {

		const instance = {
			model: 'AWARD_CEREMONY',
			name: '',
			errors: {},
			award: {
				model: 'AWARD',
				name: '',
				errors: {},
				differentiator: ''
			},
			categories: [
				{
					model: 'AWARD_CEREMONY_CATEGORY',
					name: '',
					errors: {},
					nominations: [
						{
							model: 'NOMINATION',
							errors: {},
							isWinner: false,
							entities: [
								{
									model: 'PERSON',
									name: '',
									errors: {},
									differentiator: ''
								}
							],
							productions: [
								{
									model: 'PRODUCTION_IDENTIFIER',
									errors: {},
									uuid: 'b22157c0-4ecd-4bd9-b4fd-2656d3def80e'
								},
								{
									model: 'PRODUCTION_IDENTIFIER',
									errors: {},
									uuid: ''
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
				name: '',
				differentiator: ''
			},
			categories: [
				{
					name: '',
					nominations: [
						{
							isWinner: false,
							entities: [
								{
									name: '',
									differentiator: ''
								}
							],
							productions: [
								{
									uuid: 'b22157c0-4ecd-4bd9-b4fd-2656d3def80e'
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
