import { Response } from "express";
import logger from "../utils/logger";

const setAccessTokenCookie = (res: Response, accessToken: string) => {
  logger.debug("Setting Access Token Cookie");
  res.cookie("accessToken", accessToken, {
    sameSite: "none",
    secure: true,
    httpOnly: true,
  });
};

const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  logger.debug("Setting Refresh Token Cookie");
  res.cookie("refreshToken", refreshToken, {
    sameSite: "none",
    secure: true,
    httpOnly: true,
  });
};

export { setAccessTokenCookie, setRefreshTokenCookie };
