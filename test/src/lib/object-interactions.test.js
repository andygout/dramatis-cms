import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { getIn, removeIn, setIn, pushIn } from '../../../src/lib/object-interactions.js';

const context = describe;

describe('Object Interactions module', () => {
	describe('getIn function', () => {
		it('returns the value at the specified path of the input object', () => {
			const object = [
				{
					foo: [
						{
							bar: 'qux'
						},
						{
							baz: 'quux'
						}
					]
				},
				{
					foo: [
						{
							bar: 'corge'
						},
						{
							baz: 'grault'
						}
					]
				}
			];

			const result = getIn(object, ['0', 'foo', '0', 'bar']);

			assert.equal(result, 'qux');
		});
	});

	describe('removeIn function', () => {
		it('returns a new object with the value at the specified path removed; the input object is not mutated', () => {
			const object = [
				{
					foo: [
						{
							bar: 'qux'
						},
						{
							baz: 'quux'
						}
					]
				},
				{
					foo: [
						{
							bar: 'corge'
						},
						{
							baz: 'grault'
						}
					]
				}
			];

			const expectedResult = [
				{
					foo: [
						{
							baz: 'quux'
						}
					]
				},
				{
					foo: [
						{
							bar: 'corge'
						},
						{
							baz: 'grault'
						}
					]
				}
			];

			const expectedInputObjectState = [
				{
					foo: [
						{
							bar: 'qux'
						},
						{
							baz: 'quux'
						}
					]
				},
				{
					foo: [
						{
							bar: 'corge'
						},
						{
							baz: 'grault'
						}
					]
				}
			];

			const result = removeIn(object, ['0', 'foo', '0']);

			assert.deepEqual(result, expectedResult);
			assert.deepEqual(object, expectedInputObjectState);
		});
	});

	describe('setIn function', () => {
		context('path is an empty array (in this scenario the input object might not be an object)', () => {
			it('returns the revision value', () => {
				const object = '';

				const expectedResult = 'foo';

				const result = setIn(object, [], 'foo');

				assert.deepEqual(result, expectedResult);
			});
		});

		context('path is a populated array', () => {
			it('returns a new object with the value at the specified path set; the input object is not mutated', () => {
				const object = [
					{
						foo: [
							{
								bar: 'qux'
							},
							{
								baz: 'quux'
							}
						]
					},
					{
						foo: [
							{
								bar: 'corge'
							},
							{
								baz: 'grault'
							}
						]
					}
				];

				const expectedResult = [
					{
						foo: [
							{
								bar: 'garply'
							},
							{
								baz: 'quux'
							}
						]
					},
					{
						foo: [
							{
								bar: 'corge'
							},
							{
								baz: 'grault'
							}
						]
					}
				];

				const expectedInputObjectState = [
					{
						foo: [
							{
								bar: 'qux'
							},
							{
								baz: 'quux'
							}
						]
					},
					{
						foo: [
							{
								bar: 'corge'
							},
							{
								baz: 'grault'
							}
						]
					}
				];

				const result = setIn(object, ['0', 'foo', '0', 'bar'], 'garply');

				assert.deepEqual(result, expectedResult);
				assert.deepEqual(object, expectedInputObjectState);
			});
		});
	});

	describe('pushIn function', () => {
		context('path is an empty array', () => {
			it('returns a new object with the input item included in the root-level array; the input object is not mutated', () => {
				const object = [
					{
						foo: [
							{
								bar: [
									{
										qux: 'quux'
									}
								]
							},
							{
								baz: [
									{
										qux: 'corge'
									}
								]
							}
						]
					},
					{
						foo: [
							{
								bar: [
									{
										qux: 'grault'
									}
								]
							},
							{
								baz: [
									{
										qux: 'garply'
									}
								]
							}
						]
					}
				];

				const expectedResult = [
					{
						foo: [
							{
								bar: [
									{
										qux: 'quux'
									}
								]
							},
							{
								baz: [
									{
										qux: 'corge'
									}
								]
							}
						]
					},
					{
						foo: [
							{
								bar: [
									{
										qux: 'grault'
									}
								]
							},
							{
								baz: [
									{
										qux: 'garply'
									}
								]
							}
						]
					},
					{
						foo: [
							{
								bar: [
									{
										qux: ''
									}
								]
							},
							{
								baz: [
									{
										qux: ''
									}
								]
							}
						]
					}
				];

				const expectedInputObjectState = [
					{
						foo: [
							{
								bar: [
									{
										qux: 'quux'
									}
								]
							},
							{
								baz: [
									{
										qux: 'corge'
									}
								]
							}
						]
					},
					{
						foo: [
							{
								bar: [
									{
										qux: 'grault'
									}
								]
							},
							{
								baz: [
									{
										qux: 'garply'
									}
								]
							}
						]
					}
				];

				const result = pushIn(object, [], { foo: [{ bar: [{ qux: '' }] }, { baz: [{ qux: '' }] }] });

				assert.deepEqual(result, expectedResult);
				assert.deepEqual(object, expectedInputObjectState);
			});
		});

		context('path is a populated array', () => {
			it('returns a new object with the array at the specified path including the input item; the input object is not mutated', () => {
				const object = [
					{
						foo: [
							{
								bar: [
									{
										qux: 'quux'
									}
								]
							},
							{
								baz: [
									{
										qux: 'corge'
									}
								]
							}
						]
					},
					{
						foo: [
							{
								bar: [
									{
										qux: 'grault'
									}
								]
							},
							{
								baz: [
									{
										qux: 'garply'
									}
								]
							}
						]
					}
				];

				const expectedResult = [
					{
						foo: [
							{
								bar: [
									{
										qux: 'quux'
									},
									{
										qux: 'waldo'
									}
								]
							},
							{
								baz: [
									{
										qux: 'corge'
									}
								]
							}
						]
					},
					{
						foo: [
							{
								bar: [
									{
										qux: 'grault'
									}
								]
							},
							{
								baz: [
									{
										qux: 'garply'
									}
								]
							}
						]
					}
				];

				const expectedInputObjectState = [
					{
						foo: [
							{
								bar: [
									{
										qux: 'quux'
									}
								]
							},
							{
								baz: [
									{
										qux: 'corge'
									}
								]
							}
						]
					},
					{
						foo: [
							{
								bar: [
									{
										qux: 'grault'
									}
								]
							},
							{
								baz: [
									{
										qux: 'garply'
									}
								]
							}
						]
					}
				];

				const result = pushIn(object, ['0', 'foo', '0', 'bar'], { qux: 'waldo' });

				assert.deepEqual(result, expectedResult);
				assert.deepEqual(object, expectedInputObjectState);
			});
		});
	});
});
