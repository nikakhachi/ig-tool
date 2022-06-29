import NodeCache = require("node-cache");
import { CacheKeys } from "./enums";

const cache = new NodeCache({ checkperiod: 1 });

const setInstagramSessionIdInCache = (value: string) => cache.set(CacheKeys.INSTAGRAM_SESSION_ID, value, 60 * 60 * 5);

const getInstagramSessionIdFromCache = () => cache.get(CacheKeys.INSTAGRAM_SESSION_ID);

const setCacheEvent = (event: string, callback: (key: string, value: string) => void) => {
  cache.on(event, (key, value) => callback(key, value));
};

export { getInstagramSessionIdFromCache, setInstagramSessionIdInCache, setCacheEvent };
