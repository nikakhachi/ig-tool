import { Response } from "express";
import logger from "../utils/logger";

logger.warn("Cookie secure attribute is set to False. Once we have HTTPS, we need to change it immediately!");

const setAccessTokenCookie = (res: Response, accessToken: string) => {
  logger.debug("Setting Access Token Cookie");
  res.cookie("accessToken", accessToken, {
    sameSite: "none",
    secure: false,
    httpOnly: true,
  });
};

const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  logger.debug("Setting Refresh Token Cookie");
  res.cookie("refreshToken", refreshToken, {
    sameSite: "none",
    secure: false,
    httpOnly: true,
  });
};

export { setAccessTokenCookie, setRefreshTokenCookie };
