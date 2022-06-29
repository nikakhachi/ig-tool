import cron from "node-cron";
import { setInstagramSessionIdInCache } from "../cache";
import { prisma } from "../prisma";
import instagrapi from "../providers/instagrapi.provider";
import { updateUser } from "../services/user.service";
import logger from "../utils/logger";

const userUpdaterCron = async () => {
  try {
    logger.debug("CRON : User Updater Cron has started");
    const users = await prisma.user.findMany({
      include: {
        connections: true,
      },
    });
    for (const user of users) {
      await updateUser(user);
    }
    logger.debug("CRON : User Updater Cron has Ended");
  } catch (e) {
    logger.error("CRON: failed userUpdaterCron", e);
  }
};

const instagrapiSessionIdCron = async () => {
  try {
    logger.debug("CRON : SessionID Cron Started");
    const sessionId = await instagrapi.getSessionId();
    setInstagramSessionIdInCache(sessionId);
    logger.debug("CRON : SessionID Cron has Ended");
  } catch (e) {
    logger.error("CRON: failed instagrapiSessionIdCron", e);
  }
};

// instagrapiSessionIdCron();
setInstagramSessionIdInCache("54017079092%3AUmny1PAHZ5C0ar%3A10");
// userUpdaterCron();

export const initScheduledJobs = () => {
  try {
    cron.schedule("0 * * * *", userUpdaterCron);
    cron.schedule("0 */2 * * *", instagrapiSessionIdCron);
  } catch (e) {
    logger.error("CRON: scheduling was failed");
  }
};
