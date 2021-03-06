import { isAuthenticated } from '../../../middlewares';

export default {
  Mutation: {
    toggleLike: async (_, { postId, liked }, { request, prisma }) => {
      isAuthenticated(request);
      const { user } = request; // 이 아래부터는 isAuthenticated에서 에러발생시 실행x
      try {
        const likeExists = await prisma.$exists.like({
          AND: [
            {
              user: {
                id: user.id,
              },
            }, {
              post: {
                id: postId,
              },
            },
          ],
        });
        if (likeExists && !liked) {
          await prisma.deleteManyLikes({
            AND: [
              {
                user: {
                  id: user.id,
                },
              }, {
                post: {
                  id: postId,
                },
              },
            ],
          });
        } else if (!likeExists && liked) {
          await prisma.createLike({
            user: {
              connect: {
                id: user.id,
              },
            },
            post: {
              connect: {
                id: postId,
              },
            },
          });
        }
        return true;
      } catch {
        return false;
      }
    },
  },
};
