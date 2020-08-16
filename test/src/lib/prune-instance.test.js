import { expect } from 'chai';
import { createSandbox } from 'sinon';

import * as isObjectWithKeysModule from '../../../src/lib/is-object-with-keys';
import pruneInstance from '../../../src/lib/prune-instance';

describe('prune Instance module', () => {

	let stubs;

	const sandbox = createSandbox();

	beforeEach(() => {

		stubs = {
			isObjectWithKeys: sandbox.stub(isObjectWithKeysModule, 'isObjectWithKeys').returns(false)
		};

	});

	afterEach(() => {

		sandbox.restore();

	});

	it('removes top-level concealed attributes (e.g. \'errors\', and \'uuid\')', () => {

		const instance = {
			name: 'King Lear',
			errors: {},
			uuid: 'b22157c0-4ecd-4bd9-b4fd-2656d3def80e'
		};

		const result = pruneInstance(instance);

		const expectation = {
			name: 'King Lear'
		};

		expect(stubs.isObjectWithKeys.calledOnce).to.be.true;
		expect(result).to.deep.equal(expectation);

	});

	it('retains top-level \'model\' attribute', () => {

		const instance = {
			name: 'King Lear',
			model: 'production'
		};

		const result = pruneInstance(instance);

		const expectation = {
			name: 'King Lear',
			model: 'production'
		};

		expect(stubs.isObjectWithKeys.calledOnce).to.be.true;
		expect(result).to.deep.equal(expectation);

	});

	it('removes nested-level concealed attributes (e.g. \'errors\', and \'model\')', () => {

		stubs.isObjectWithKeys
			.onFirstCall().returns(false)
			.onSecondCall().returns(false)
			.onThirdCall().returns(true)
			.onCall(3).returns(false)
			.onCall(4).returns(false)
			.onCall(5).returns(true)
			.onCall(6).returns(false)
			.onCall(7).returns(false);

		const instance = {
			name: 'King Lear',
			cast: [
				{
					name: 'Ian McKellen',
					errors: {},
					model: 'person',
					roles: [
						{
							name: 'King Lear',
							errors: {},
							model: 'role',
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

		expect(stubs.isObjectWithKeys.callCount).to.equal(8);
		expect(result).to.deep.equal(expectation);

	});

	describe('filters out array items that have empty string name', () => {

		context('array items with non-empty strings exist', () => {

			it('filters out array items that have empty string name values', () => {

				stubs.isObjectWithKeys
					.onFirstCall().returns(false)
					.onSecondCall().returns(false)
					.onThirdCall().returns(true)
					.onCall(3).returns(false)
					.onCall(4).returns(false)
					.onCall(5).returns(true)
					.onCall(6).returns(false)
					.onCall(7).returns(false);

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

				expect(stubs.isObjectWithKeys.callCount).to.equal(8);
				expect(result).to.deep.equal(expectation);

			});

		});

		context('array items with non-empty strings do not exist', () => {

			it('leaves single array item that has empty string name value', () => {

				stubs.isObjectWithKeys
					.onFirstCall().returns(false)
					.onSecondCall().returns(false)
					.onThirdCall().returns(true)
					.onCall(3).returns(false)
					.onCall(4).returns(false)
					.onCall(5).returns(true)
					.onCall(6).returns(false)
					.onCall(7).returns(false);

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

				expect(stubs.isObjectWithKeys.callCount).to.equal(8);
				expect(result).to.deep.equal(expectation);

			});

		});

	});

	it('prunes a sample instance as per specification', () => {

		stubs.isObjectWithKeys
			.onFirstCall().returns(false)
			.onSecondCall().returns(true)
			.onThirdCall().returns(false)
			.onCall(3).returns(true)
			.onCall(4).returns(false)
			.onCall(5).returns(false)
			.onCall(6).returns(true)
			.onCall(7).returns(false)
			.onCall(8).returns(false)
			.onCall(9).returns(true)
			.onCall(10).returns(false)
			.onCall(11).returns(false);

		const instance = {
			name: 'King Lear',
			errors: {},
			model: 'production',
			uuid: 'b22157c0-4ecd-4bd9-b4fd-2656d3def80e',
			theatre: {
				name: 'Courtyard Theatre',
				errors: {},
				model: 'theatre'
			},
			playtext: {
				name: '',
				errors: {},
				model: 'playtext'
			},
			cast: [
				{
					name: 'Ian McKellen',
					errors: {},
					model: 'person',
					roles: [
						{
							name: 'King Lear',
							errors: {},
							model: 'role',
							characterName: ''
						},
						{
							name: '',
							errors: {},
							model: 'role',
							characterName: ''
						}
					]
				},
				{
					name: '',
					errors: {},
					model: 'person',
					roles: [
						{
							name: '',
							errors: {},
							model: 'role',
							characterName: ''
						}
					]
				}
			]
		};

		const result = pruneInstance(instance);

		const expectation = {
			name: 'King Lear',
			model: 'production',
			theatre: {
				name: 'Courtyard Theatre'
			},
			playtext: {
				name: ''
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

		expect(stubs.isObjectWithKeys.callCount).to.equal(12);
		expect(result).to.deep.equal(expectation);

	});

});
