import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../convex/_generated/api';

export const getConvexUser = async (userId: string) => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const convexUser = await convex.query(api.users.getUser, {
    userId,
  });
  return convexUser;
};
