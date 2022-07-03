import axios from "axios";
import { INSTAGRAPI_REST_ENDPOINT } from ".";
import { getInstagrapiRootAccountCredentials } from "../../services/instagrapi/rootAccount.service";
import logger from "../../utils/logger";
import FormData from "form-data";

export default async () => {
  logger.debug("INSTAGRAPI : Getting Session ID");
  const formData = new FormData();
  const { username, password } = getInstagrapiRootAccountCredentials();
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
