import { getCache, setCache } from "../../cache";
import { CacheKeys } from "../../cache/enums";
import instagrapi from "../../providers/instagrapi";
import logger from "../../utils/logger";

const sessionIdExpiration = 60 * 60 * 5;
const sessionIdRateLimit = 10;

const getInstagramSessionIdRate = () => {
  const sessionIdRate = getCache(CacheKeys.INSTAGRAM_SESSION_ID_RATE);
  if (typeof sessionIdRate !== "number") {
    throw new Error("Instagrapi Session ID Rate not Found");
  }
  return sessionIdRate;
};

export const setInstagramSessionIdInCache = (value: string) => {
  setCache(CacheKeys.INSTAGRAM_SESSION_ID, value, sessionIdExpiration);
  setCache(CacheKeys.INSTAGRAM_SESSION_ID_RATE, 0, sessionIdExpiration);
};

export const getInstagramSessionIdFromCache = () => {
  const sessionId = getCache(CacheKeys.INSTAGRAM_SESSION_ID);
  if (!sessionId || typeof sessionId !== "string") {
    throw new Error("Instagrapi Session ID not Found");
  }
  const sessionIdRate = increaseInstagramSessionIdRate();
  logger.debug(`Instagrapi SessionID : ${sessionId} | Rate : ${sessionIdRate}`);
  if (sessionIdRate >= sessionIdRateLimit) {
    logger.warn(`Instagrapi SessionID Rate Limit has reached. Generating new SessionID..`);
    instagrapi.generateSessionId();
  }
  return sessionId;
};

const increaseInstagramSessionIdRate = (n = 1) => {
  const sessionIdRate = getInstagramSessionIdRate();
  setCache(CacheKeys.INSTAGRAM_SESSION_ID_RATE, sessionIdRate + n, sessionIdExpiration);
  return sessionIdRate + n;
};
