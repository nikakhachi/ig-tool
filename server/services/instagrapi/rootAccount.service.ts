import { getCache, setCache } from "../../cache";
import { CacheKeys } from "../../cache/enums";
import logger from "../../utils/logger";

const numOfInstagramRootAccounts: number = process.env.INSTAGRAPI_REST_USERNAME?.split(" ").length || 1;
const usernames = process.env["INSTAGRAPI_REST_USERNAME"]?.split(" ");
const passwords = process.env["INSTAGRAPI_REST_PASSWORD"]?.split(" ");

logger.info(`Number of Instagrapi root accounts : ${numOfInstagramRootAccounts}`);

const updateRootAccountIteratorInCache = (cachedIterator: number) => {
  let iteratorNextValue = cachedIterator;

  const conditionToIncrease: boolean = typeof iteratorNextValue === "number" && iteratorNextValue < numOfInstagramRootAccounts - 1;

  if (conditionToIncrease) {
    iteratorNextValue++;
  } else {
    // If an iterator value hits the number of accounts available or it is not present at all
    iteratorNextValue = 0;
  }

  setCache(CacheKeys.ROOT_ACCOUNT_ITERATOR, iteratorNextValue, 60 * 60 * 24);
};

export const getInstagrapiRootAccountCredentials = () => {
  const cachedIterator = (getCache(CacheKeys.ROOT_ACCOUNT_ITERATOR) as number) || 0;

  const username = usernames?.[cachedIterator];
  const password = passwords?.[cachedIterator];
  if (!username || !password) throw new Error("Can not get Instagrapi root account credentials");

  logger.info(`INSTAGRAPI ROOT: ${username} | ${cachedIterator}`);

  updateRootAccountIteratorInCache(cachedIterator);

  return { username, password };
};
