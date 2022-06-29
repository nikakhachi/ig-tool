export type FollowingsByDays = {
  time: string | number;
  followings: {
    id: number;
    createdAt: string;
    pk: string;
    username: string;
    fullName: string;
    profilePicUrl: string;
    userId: string;
    followsBack: boolean;
  }[];
};
