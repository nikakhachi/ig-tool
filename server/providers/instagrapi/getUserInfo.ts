import axios from "axios";
import { INSTAGRAPI_REST_ENDPOINT } from ".";
import { getInstagramSessionIdFromCache } from "../../services/instagrapi/sessionid.service";
import { UserInfoType } from "../../types/instagrapiProvider.types";
import logger from "../../utils/logger";
import FormData from "form-data";

export default async (pk: string) => {
  logger.debug("INSTAGRAPI : Getting User Info");
  const formData = new FormData();
  formData.append("user_id", pk);
  formData.append("sessionid", getInstagramSessionIdFromCache());
  formData.append("use_cache", "false");
  const { data: userInfo } = (await axios.post(`${INSTAGRAPI_REST_ENDPOINT}/user/info`, formData)) as { data: UserInfoType };
  return userInfo;
};
