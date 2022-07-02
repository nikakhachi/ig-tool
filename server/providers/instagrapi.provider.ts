import axios from "axios";
import FormData from "form-data";
import { getInstagramSessionIdFromCache } from "../cache";
import generateRootUserCredentials from "../config/generateRootUserCredentials";
import { FullInstagramUserDataType, UserConnectionType } from "../types/main.types";
import logger from "../utils/logger";
import { UserInfoType } from "../types/instagrapiProvider.types";

const INSTAGRAPI_REST_ENDPOINT = `http://localhost:8000`;

const getSessionId = async () => {
  logger.debug("INSTAGRAPI : Getting Session ID");
  const formData = new FormData();
  const { username, password } = generateRootUserCredentials();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("verification_code", "");
  formData.append("proxy", "");
  formData.append("locale", "");
  formData.append("timezone", "");
  const { data: instagrapiSessionId } = await axios.post(`${INSTAGRAPI_REST_ENDPOINT}/auth/login`, formData);
  logger.debug(`INSTAGRAPI : New Session ID is ${instagrapiSessionId}`);
  return instagrapiSessionId as string;
};

const getUserId = async (username: string): Promise<{ id: string }> => {
  logger.debug("INSTAGRAPI : Getting User ID");
  const instagrapiSessionId = getInstagramSessionIdFromCache();
  const formData = new FormData();
  formData.append("username", username);
  formData.append("sessionid", instagrapiSessionId);
  const { data } = await axios.post(`${INSTAGRAPI_REST_ENDPOINT}/user/id_from_username`, formData);
  return { id: data as string };
};

const getFollowings = async (pk: string) => {
  logger.debug("INSTAGRAPI : Getting User Followings");
  const instagrapiSessionId = getInstagramSessionIdFromCache();
  const formData = new FormData();
  formData.append("user_id", pk);
  formData.append("sessionid", instagrapiSessionId);
  formData.append("use_cache", "false");
  formData.append("amount", "0");
  const { data } = await axios.post(`${INSTAGRAPI_REST_ENDPOINT}/user/following`, formData);
  const followings: UserConnectionType[] = Object.keys(data).map((item) => ({
    pk: data[item].pk,
    username: data[item].username,
    full_name: data[item].full_name,
    is_private: data[item].is_private,
    profile_pic_url: data[item].profile_pic_url,
  }));
  return followings;
};

const getFollowers = async (pk: string) => {
  logger.debug("INSTAGRAPI : Getting User Followers");
  const instagrapiSessionId = getInstagramSessionIdFromCache();
  const formData = new FormData();
  formData.append("user_id", pk);
  formData.append("sessionid", instagrapiSessionId);
  formData.append("use_cache", "false");
  formData.append("amount", "0");
  const { data } = await axios.post(`${INSTAGRAPI_REST_ENDPOINT}/user/followers`, formData);
  const followers: UserConnectionType[] = Object.keys(data).map((item) => ({
    pk: data[item].pk,
    username: data[item].username,
    full_name: data[item].full_name,
    is_private: data[item].is_private,
    profile_pic_url: data[item].profile_pic_url,
  }));
  return followers;
};

const getUserInfo = async (pk: string) => {
  logger.debug("INSTAGRAPI : Getting User Info");
  const formData = new FormData();
  formData.append("user_id", pk);
  formData.append("sessionid", getInstagramSessionIdFromCache());
  formData.append("use_cache", "false");
  const { data: userInfo } = (await axios.post(`${INSTAGRAPI_REST_ENDPOINT}/user/info`, formData)) as { data: UserInfoType };
  return userInfo;
};

const getFullUserDataByPk = async (pk: string) => {
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

const getFullUserDataByUsername = async (username: string) => {
  const { id: userPk } = await getUserId(username);
  return getFullUserDataByPk(userPk);
};

const instagrapi = {
  getSessionId,
  getUserId,
  getFollowers,
  getFollowings,
  getFullUserDataByPk,
  getFullUserDataByUsername,
  getUserInfo,
};

export default instagrapi;
