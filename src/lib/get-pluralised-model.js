import { irregularPluralNouns } from '../utils/constants';

export default model => irregularPluralNouns[model] || model + 's';
