import { expect } from 'chai';

import { getIn, removeIn, setIn, pushIn } from '../../../src/lib/object-interactions.js';

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

			expect(result).to.equal('qux');

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

			expect(result).to.deep.equal(expectedResult);
			expect(object).to.deep.equal(expectedInputObjectState);

		});

	});

	describe('setIn function', () => {

		context('path is an empty array (in this scenario the input object might not be an object)', () => {

			it('returns the revision value', () => {

				const object = '';

				const expectedResult = 'foo';

				const result = setIn(object, [], 'foo');

				expect(result).to.deep.equal(expectedResult);

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

				expect(result).to.deep.equal(expectedResult);
				expect(object).to.deep.equal(expectedInputObjectState);

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

				expect(result).to.deep.equal(expectedResult);
				expect(object).to.deep.equal(expectedInputObjectState);

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

				expect(result).to.deep.equal(expectedResult);
				expect(object).to.deep.equal(expectedInputObjectState);

			});

		});

	});

});
