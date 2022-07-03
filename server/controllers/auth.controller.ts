import { Request, Response } from "express";
import instagrapi from "../providers/instagrapi";
import { setAccessTokenCookie, setRefreshTokenCookie } from "../services/cookie.service";
import { signAccessToken, signRefreshToken } from "../services/jwt.service";
import { createUser, getUserByUsername } from "../services/user.service";
import logger from "../utils/logger";
import { BadRequestException, SuccessResponse } from "../utils/responses";

export const validateUserController = (req: Request, res: Response) => {
  logger.debug("Send Credentials For User Validation");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  new SuccessResponse(res, req.user);
};

export const signInController = async (req: Request, res: Response) => {
  logger.debug("Sign In User");
  const { username, password } = req.body;
  if (!username || !password) return new BadRequestException(res, "Fields are Missing");
  const usernameInDb = await getUserByUsername(username);
  if (!usernameInDb || password !== process.env.PASSWORD) return new BadRequestException(res, "Invalid Credentials");
  const accessToken = await signAccessToken(username);
  const refreshToken = await signRefreshToken(username);
  setAccessTokenCookie(res, accessToken);
  setRefreshTokenCookie(res, refreshToken);
  new SuccessResponse(res, "Signed In Successfully");
};

export const registerInstagramUserController = async (req: Request, res: Response) => {
  logger.info("Register Instagram User");
  const { username } = req.body;
  if (!username) return new BadRequestException(res, "Provide Username");
  const existingUser = await getUserByUsername(username);
  if (existingUser) return new BadRequestException(res, "User Already Exists");
  const userData = await instagrapi.getFullUserDataByUsername(username);
  const createdUser = await createUser(userData);
  new SuccessResponse(res, createdUser);
};
