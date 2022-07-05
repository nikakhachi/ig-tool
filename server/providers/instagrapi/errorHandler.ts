import logger from "../../utils/logger";

type InstagrapiErrorExcTypes = "UnknownError" | "BadPassword" | "RateLimitError";

type InstagrapiErrorResponseData = {
  detail: string;
  exc_type: InstagrapiErrorExcTypes;
};

export const instagrapiErrorHandler = (eResponseData: InstagrapiErrorResponseData, path: string) => {
  logger.error("--------------------------------------");
  logger.error(`INSTAGRAPI : ${eResponseData.exc_type} at ${path}`);
  logger.error(`INSTAGRAPI : ${eResponseData.detail}`);
  logger.error("--------------------------------------");
  throw "";
};