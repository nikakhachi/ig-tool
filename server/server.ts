import * as dotenv from "dotenv";
dotenv.config();
import logger from "./utils/logger";
import { checkEnvVariables } from "./checkEnvVariables";
import { initScheduledJobs } from "./cron";

checkEnvVariables();

import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => logger.info(`Server Running on PORT : ${PORT}`));

initScheduledJobs();
