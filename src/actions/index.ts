import { auth } from './auth';
import { item, list } from './basket';

export const server = {
  auth,
  basket: {
    item,
    list,
  },
};
