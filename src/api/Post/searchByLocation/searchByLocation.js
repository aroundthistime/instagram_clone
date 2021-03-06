import {POST_FRAGMENT_SIMPLE} from '../../../fragments';

export default {
  Query: {
    searchByLocation: (_, { term }, { prisma }) => prisma.posts({
      where: {
        location_contains: term,
      },
    }).$fragment(POST_FRAGMENT_SIMPLE),
  },
};
