import instagrapi from ".";
import logger from "../../utils/logger";

type InstagrapiErrorExcTypes = "UnknownError" | "BadPassword" | "RateLimitError";

type InstagrapiErrorResponseData = {
  detail: string;
  exc_type: InstagrapiErrorExcTypes;
};

const RECURRENT_ERROR_LIMIT = 5;
let instagrapiErrorCount = 0;

export const instagrapiErrorHandler = async (
  eResponseData: InstagrapiErrorResponseData,
  path: string,
  callback: () => Promise<any>,
  isCallbackSessionIdGeneration = false
) => {
  instagrapiErrorCount++;
  logger.warn(`INSTAGRAPI : ${eResponseData.exc_type} at ${path}`);
  logger.warn(`INSTAGRAPI : ${eResponseData.detail}`);
  if (instagrapiErrorCount > RECURRENT_ERROR_LIMIT) {
    logger.error(`INSTAGRAPI : Recurrent Error Limit has Reached`);
    throw new Error("To many recurrent Instagrapi Errors");
  }
  logger.warn(`INSTAGRAPI : Retrying..`);
  await instagrapi.generateSessionId();
  instagrapiErrorCount = 0;
  if (!isCallbackSessionIdGeneration) {
    return callback();
  }
};
