import { Movie, RequestKey } from './index';

export type Category = {
  [k in RequestKey]: Movie[];
};
