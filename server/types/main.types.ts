import { User } from "@prisma/client";

export type ConnectionActionType = "Followed" | "Followers Gained" | "Unfollowed" | "Follower Lost";

export type UserConnectionType = {
  pk: number;
  username: string;
  full_name: string;
  profile_pic_url: string;
  connectionTypeId?: number;
};

export type FullInstagramUserDataType = {
  userInfo: {
    username: string;
    biography: string;
    profilePicUrl: string;
    profilePicUrlHd: string;
    pk: string;
    isPrivate: boolean;
    isVerified: boolean;
    followerCount: number;
    followingCount: number;
  };
  userFollowers: UserConnectionType[];
  userFollowings: UserConnectionType[];
};

export type UserType = User;
