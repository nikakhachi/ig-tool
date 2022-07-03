import getUserId from "./getUserId";
import getSessionId from "./getSessionId";
import getFollowers from "./getFollowers";
import getFollowings from "./getFollowings";
import getFullUserDataByPk from "./getFullUserDataByPk";
import getFullUserDataByUsername from "./getFullUserDataByUsername";
import getUserInfo from "./getUserInfo";

export const INSTAGRAPI_REST_ENDPOINT = `http://localhost:8000`;

const instagrapi = {
  getUserId,
  getSessionId,
  getFollowers,
  getFollowings,
  getFullUserDataByPk,
  getFullUserDataByUsername,
  getUserInfo,
};

export default instagrapi;
