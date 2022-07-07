import cron from "node-cron";
import { prisma } from "../prisma";
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
    console.error(e); // eslint-disable-line
    logger.error("CRON: failed userUpdaterCron");
  }
};

export const initScheduledJobs = () => {
  try {
    cron.schedule("0 19 * * *", userUpdaterCron);
  } catch (e) {
    logger.error("CRON: scheduling was failed");
  }
};
