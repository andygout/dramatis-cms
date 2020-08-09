import { List, Map } from 'immutable';

const createBlankMap = map => {

	return map.withMutations(mutableMap =>
		map.keySeq().forEach(key =>
			mutableMap.update(key, value => {

				switch (true) {

					case key === 'errors':
						return Map();

					case Map.isMap(value):
						return createBlankMap(value);

					case List.isList(value):
						return List([createBlankMap(value.get(0))]);

					default:
						return '';

				}

			})
		)
	);

};

export default createBlankMap;
