import * as dotenv from "dotenv";
dotenv.config();
import logger from "./utils/logger";
import { checkEnvVariables } from "./checkEnvVariables";
import { initScheduledJobs } from "./cron";
import instagrapi from "./providers/instagrapi";

checkEnvVariables();

import app from "./app";

const PORT = process.env.PORT || 5000;

logger.info(`Running in ${process.env.NODE_ENV} Mode`);

instagrapi.generateSessionId().then(() => {
  app.listen(PORT, () => logger.info(`Server Running on PORT : ${PORT}`));
  initScheduledJobs();
});
