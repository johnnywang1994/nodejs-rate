import devAPI from './dev';
import prodAPI from './prod';

export default process.env.NODE_ENV !== 'production'
  ? devAPI
  : prodAPI;
