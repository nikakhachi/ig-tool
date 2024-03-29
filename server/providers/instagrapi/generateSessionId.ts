import axios from "axios";
import { INSTAGRAPI_REST_ENDPOINT } from ".";
import { getInstagrapiRootAccountCredentials } from "../../services/instagrapi/rootAccount.service";
import logger from "../../utils/logger";
import FormData from "form-data";
import { instagrapiErrorHandler } from "./errorHandler";
import { setInstagramSessionIdInCache } from "../../services/instagrapi/sessionid.service";

const generateSessionId = async () => {
  logger.info("INSTAGRAPI : Getting Session ID");
  const formData = new FormData();
  const { username, password } = getInstagrapiRootAccountCredentials();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("verification_code", "");
  formData.append("proxy", "");
  formData.append("locale", "");
  formData.append("timezone", "");
  const path = "/auth/login";
  try {
    const { data: instagrapiSessionId } = await axios.post(`${INSTAGRAPI_REST_ENDPOINT}${path}`, formData);
    logger.info(`INSTAGRAPI : New Session ID is ${instagrapiSessionId}`);
    setInstagramSessionIdInCache(instagrapiSessionId);
    return instagrapiSessionId as string;
  } catch (error: any) {
    return instagrapiErrorHandler(error.response.data, path, generateSessionId, true);
  }
};

export default generateSessionId;
