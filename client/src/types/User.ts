export type UserType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  pk: string;
  username: string;
  followerCount: number;
  followingCount: number;
  profilePicUrl: string;
  profilePicUrlHd: string;
  isPrivate: boolean;
  isVerified: boolean;
  biography: string;
};
