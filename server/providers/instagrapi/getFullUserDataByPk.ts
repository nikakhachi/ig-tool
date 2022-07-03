import { FullInstagramUserDataType } from "../../types/main.types";
import logger from "../../utils/logger";
import getFollowers from "./getFollowers";
import getFollowings from "./getFollowings";
import getUserInfo from "./getUserInfo";

export default async (pk: string) => {
  logger.debug("INSTAGRAPI : Getting Full User Data");
  const userInfo = await getUserInfo(pk);
  const userFollowers = await getFollowers(pk);
  const userFollowings = await getFollowings(pk);
  const {
    username,
    pk: userInfoPk,
    profile_pic_url,
    profile_pic_url_hd,
    follower_count,
    following_count,
    biography,
    is_private,
    is_verified,
  } = userInfo;
  const data: FullInstagramUserDataType = {
    userInfo: {
      username,
      biography,
      profilePicUrl: profile_pic_url,
      profilePicUrlHd: profile_pic_url_hd,
      pk: userInfoPk,
      isPrivate: is_private,
      isVerified: is_verified,
      followerCount: follower_count,
      followingCount: following_count,
    },
    userFollowers,
    userFollowings,
  };
  return data;
};
