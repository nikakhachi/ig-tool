import { NextFunction, Request, Response } from "express";
import { setAccessTokenCookie, setRefreshTokenCookie } from "../services/cookie.service";
import { signAccessToken, signRefreshToken } from "../services/jwt.service";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";
import { getUserByUsername } from "../services/user.service";
import { InternalServerErrorException, UnauthorizedException } from "../utils/responses";

const authenticationGuard = async (req: Request, res: Response, next: NextFunction) => {
  logger.debug("AUTH GUARD : Inside Guard");
  const { accessToken, refreshToken } = req.cookies;
  try {
    const payload = jwt.verify(accessToken, process.env.JWT_KEY || "accessKey");
    if (typeof payload === "string") return new Error("Internal Server Error");
    const user = await getUserByUsername(payload.id);
    if (!user) return new InternalServerErrorException(res);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.user = user;
    logger.debug("AUTH GUARD : Access Token is Valid.");
    next();
  } catch (e) {
    try {
      logger.debug("AUTH GUARD : Access Token is not Valid. Checking Refresh Token");
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY || "refreshKey");
      if (typeof payload === "string") return new Error("Internal Server Error");
      const user = await getUserByUsername(payload.id);
      if (!user) return new InternalServerErrorException(res);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      req.user = user;
      logger.debug("AUTH GUARD : Refresh Token is Valid. Assigning new Access and Refresh Tokens");
      const newAccessToken = await signAccessToken(req.sessionID);
      const newRefreshToken = await signRefreshToken(req.sessionID);
      setAccessTokenCookie(res, newAccessToken);
      setRefreshTokenCookie(res, newRefreshToken);
      next();
    } catch (e) {
      logger.debug("AUTH GUARD : Both Tokens Failed Validation");
      return new UnauthorizedException(res);
    }
  }
};

export { authenticationGuard };
