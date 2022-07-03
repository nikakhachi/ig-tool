import axios from "axios";
import { INSTAGRAPI_REST_ENDPOINT } from ".";
import { getInstagramSessionIdFromCache } from "../../services/instagrapi/sessionid.service";
import { UserConnectionType } from "../../types/main.types";
import logger from "../../utils/logger";
import FormData from "form-data";
import { instagrapiErrorHandler } from "./errorHandler";

export default async (pk: string) => {
  logger.debug("INSTAGRAPI : Getting User Followings");
  const instagrapiSessionId = getInstagramSessionIdFromCache();
  const formData = new FormData();
  formData.append("user_id", pk);
  formData.append("sessionid", instagrapiSessionId);
  formData.append("use_cache", "false");
  formData.append("amount", "0");
  const path = "/user/following";
  try {
    const { data } = await axios.post(`${INSTAGRAPI_REST_ENDPOINT}${path}`, formData);
    const followings: UserConnectionType[] = Object.keys(data).map((item) => ({
      pk: data[item].pk,
      username: data[item].username,
      full_name: data[item].full_name,
      is_private: data[item].is_private,
      profile_pic_url: data[item].profile_pic_url,
    }));
    return followings;
  } catch (error: any) {
    return instagrapiErrorHandler(error.response.data, path);
  }
};
