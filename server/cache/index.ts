import NodeCache = require("node-cache");
import instagrapi from "../providers/instagrapi.provider";
import logger from "../utils/logger";
import { CacheKeys } from "./enums";

const cache = new NodeCache({ checkperiod: 1 });

const sessionIdExpiration = 60 * 60 * 5;
const sessionIdRateLimit = 5;

const getInstagramSessionIdRate = () => {
  const sessionIdRate = cache.get(CacheKeys.INSTAGRAM_SESSION_ID_RATE);
  if (typeof sessionIdRate !== "number") {
    throw new Error("Instagrapi Session ID Rate not Found");
  }
  return sessionIdRate;
};

const setInstagramSessionIdInCache = (value: string) => {
  cache.set(CacheKeys.INSTAGRAM_SESSION_ID, value, sessionIdExpiration);
  cache.set(CacheKeys.INSTAGRAM_SESSION_ID_RATE, 0, sessionIdExpiration);
};

const getInstagramSessionIdFromCache = () => {
  const sessionId = cache.get(CacheKeys.INSTAGRAM_SESSION_ID);
  if (!sessionId) {
    throw new Error("Instagrapi Session ID not Found");
  }
  const sessionIdRate = increaseInstagramSessionIdRate();
  logger.debug(`Instagrapi SessionID : ${sessionId} | Rate : ${sessionIdRate}`);
  if (sessionIdRate >= sessionIdRateLimit) {
    logger.debug(`Instagrapi SessionID Rate Limit has reached. Generating new SessionID..`);
    instagrapi.getSessionId().then((sessionId) => {
      setInstagramSessionIdInCache(sessionId);
    });
  }
  return sessionId;
};

const increaseInstagramSessionIdRate = (n = 1) => {
  const sessionIdRate = getInstagramSessionIdRate();
  cache.set(CacheKeys.INSTAGRAM_SESSION_ID_RATE, sessionIdRate + n, sessionIdExpiration);
  return sessionIdRate + n;
};

const setCacheEvent = (event: string, callback: (key: string, value: string) => void) => {
  cache.on(event, (key, value) => callback(key, value));
};

export { getInstagramSessionIdFromCache, setInstagramSessionIdInCache, setCacheEvent };
