import { sign } from "jsonwebtoken";
import logger from "../utils/logger";

const signAccessToken = async (id: string) => {
  logger.debug("Signing Access Token");
  const accessToken = sign({ id }, process.env.JWT_KEY || "accessKey", { expiresIn: "2h" });
  return accessToken;
};

const signRefreshToken = async (id: string) => {
  logger.debug("Signing Refresh Token");
  const refreshToken = sign({ id }, process.env.JWT_REFRESH_KEY || "refreshKey", { expiresIn: "1d" });
  return refreshToken;
};

export { signAccessToken, signRefreshToken };
