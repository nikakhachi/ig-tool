import axios from "axios";
import { INSTAGRAPI_REST_ENDPOINT } from ".";
import { getInstagramSessionIdFromCache } from "../../services/instagrapi/sessionid.service";
import logger from "../../utils/logger";
import FormData from "form-data";
import { instagrapiErrorHandler } from "./errorHandler";

export default async (username: string) => {
  logger.debug("INSTAGRAPI : Getting User ID");
  const instagrapiSessionId = getInstagramSessionIdFromCache();
  const formData = new FormData();
  formData.append("username", username);
  formData.append("sessionid", instagrapiSessionId);
  const path = "/user/id_from_username";
  try {
    const { data } = await axios.post(`${INSTAGRAPI_REST_ENDPOINT}${path}`, formData);
    return { id: data as string };
  } catch (error: any) {
    return instagrapiErrorHandler(error.response.data, path);
  }
};
