import { ListWrapper } from '../../wrappers/index.js';
import { useGetCharactersQuery } from '../../../redux/slices/api.js';

const Characters = () => {

	const { data: characters = [] } = useGetCharactersQuery();

	return (
		<ListWrapper
			instances={characters}
			pageTitleText='Characters'
		>
		</ListWrapper>
	);

};

export default Characters;
