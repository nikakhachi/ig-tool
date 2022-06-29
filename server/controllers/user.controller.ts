import { User } from "@prisma/client";
import { Request, Response } from "express";
import moment from "moment";
import { ConnectionTypeEnum, ConnectionTypeType } from "../types/enums";
import { prisma } from "../prisma";
import { getUserInfo } from "../services/user.service";
import { GetConnectionsByDaysControllerResponseType } from "../types/controllerResponse.types";
import { ConnectionActionType } from "../types/main.types";
import logger from "../utils/logger";
import { BadRequestException, SuccessResponse } from "../utils/responses";

export const getUserInfoController = async (req: Request, res: Response) => {
  const { username } = req.params;
  if (!username) return new BadRequestException(res, "Provide Username");
  const userInfo = await getUserInfo(username);
  new SuccessResponse(res, userInfo);
};

export const getConnectionsByDaysController = async (req: Request, res: Response) => {
  logger.info(`Get Users Followings By Days`);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const currentUser = req.user as User;
  const connections = await prisma.connection.findMany({
    where: { userId: currentUser.id },
    select: {
      username: true,
      fullName: true,
      connectionHistory: {
        orderBy: { createdAt: "asc" },
        select: { createdAt: true, connectionTypeId: true },
      },
    },
  });
  const obj: GetConnectionsByDaysControllerResponseType = {};
  connections.forEach((connection) => {
    connection.connectionHistory.forEach((connectionHistory, connectionIndex, connectionHistoryArray) => {
      const dateOfAction = moment(connectionHistory.createdAt).utcOffset(0).milliseconds(0).seconds(0).minutes(0).hours(0).toISOString();
      if (!obj[dateOfAction]) {
        obj[dateOfAction] = {
          Followed: [],
          Unfollowed: [],
          "Follower Lost": [],
          "Followers Gained": [],
        };
      }
      let typeOfAction: ConnectionActionType[] = [];
      const connectionType = ConnectionTypeEnum[connectionHistory.connectionTypeId] as ConnectionTypeType;
      const connectionTypeBefore = ConnectionTypeEnum[connectionHistoryArray[connectionIndex - 1]?.connectionTypeId] as
        | ConnectionTypeType
        | undefined;
      //
      //
      if (connectionType === "FOLLOWER_" && connectionTypeBefore === "FOLLOWER_FOLLOWING") {
        typeOfAction = ["Unfollowed"];
      } else if (connectionType === "FOLLOWER_" && (connectionTypeBefore === "NONE" || !connectionTypeBefore)) {
        typeOfAction = ["Followers Gained"];
      } else if (connectionType === "FOLLOWER_" && connectionTypeBefore === "_FOLLOWING") {
        typeOfAction = ["Unfollowed", "Followers Gained"];
        //
        //
      } else if (connectionType === "_FOLLOWING" && connectionTypeBefore === "FOLLOWER_FOLLOWING") {
        typeOfAction = ["Follower Lost"];
      } else if (connectionType === "_FOLLOWING" && connectionTypeBefore === "FOLLOWER_") {
        typeOfAction = ["Followed", "Follower Lost"];
      } else if (connectionType === "_FOLLOWING" && (connectionTypeBefore === "NONE" || !connectionTypeBefore)) {
        typeOfAction = ["Followed"];
        //
        //
      } else if (connectionType === "FOLLOWER_FOLLOWING" && connectionTypeBefore === "FOLLOWER_") {
        typeOfAction = ["Followed"];
      } else if (connectionType === "FOLLOWER_FOLLOWING" && connectionTypeBefore === "_FOLLOWING") {
        typeOfAction = ["Followers Gained"];
      } else if (connectionType === "FOLLOWER_FOLLOWING" && (connectionTypeBefore === "NONE" || !connectionTypeBefore)) {
        typeOfAction = ["Followed", "Followers Gained"];
        //
        //
      } else if (connectionType === "NONE" && connectionTypeBefore === "FOLLOWER_") {
        typeOfAction = ["Follower Lost"];
      } else if (connectionType === "NONE" && connectionTypeBefore === "_FOLLOWING") {
        typeOfAction = ["Unfollowed"];
      } else if (connectionType === "NONE" && connectionTypeBefore === "FOLLOWER_FOLLOWING") {
        typeOfAction = ["Unfollowed", "Follower Lost"];
      }
      typeOfAction.forEach((actionType) =>
        obj[dateOfAction][actionType].push({
          username: connection.username,
          fullName: connection.fullName,
          thisConnectionIndexInHistory: connectionIndex,
          connectionHistory: connectionHistoryArray,
        })
      );
    });
  });
  new SuccessResponse(res, obj);
};
