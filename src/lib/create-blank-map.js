import { List, Map } from 'immutable';

const createBlankMap = map => {

	return map.withMutations(mutableMap =>
		map.keySeq().forEach(key =>
			mutableMap.update(key, value => {

				if (key === 'errors') {

					return Map();

				} else if (Map.isMap(value)) {

					return createBlankMap(value);

				} else if (List.isList(value)) {

					return List([createBlankMap(value.get(0))]);

				} else {

					return '';

				}

			})
		)
	);

};

export default createBlankMap;
