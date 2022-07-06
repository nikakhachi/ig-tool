import instagrapi from ".";
import logger from "../../utils/logger";

type InstagrapiErrorExcTypes = "UnknownError" | "BadPassword" | "RateLimitError";

type InstagrapiErrorResponseData = {
  detail: string;
  exc_type: InstagrapiErrorExcTypes;
};

export const instagrapiErrorHandler = async (
  eResponseData: InstagrapiErrorResponseData,
  path: string,
  callback: () => Promise<any>,
  isCallbackSessionIdGeneration = false
) => {
  logger.warn(`INSTAGRAPI : ${eResponseData.exc_type} at ${path}`);
  logger.warn(`INSTAGRAPI : ${eResponseData.detail}`);
  logger.warn(`INSTAGRAPI : Retrying..`);
  await instagrapi.generateSessionId();
  if (!isCallbackSessionIdGeneration) {
    return callback();
  }
};
