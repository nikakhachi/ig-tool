import { Connection, ConnectionHistory, User } from "@prisma/client";
import { ConnectionTypeEnum } from "../types/enums";
import { prisma } from "../prisma";
import instagrapi from "../providers/instagrapi.provider";
import { FullInstagramUserDataType, UserConnectionType } from "../types/main.types";
import logger from "../utils/logger";

const getProcessedConnections = (
  newlyFetchedFollowers: UserConnectionType[],
  newlyFetchedFollowings: UserConnectionType[],
  currentConnectionsInDb?: (Connection & {
    connectionHistory: ConnectionHistory[];
  })[]
) => {
  const connections: UserConnectionType[] = [];
  newlyFetchedFollowers.forEach((follower) => {
    const isAlsoFollowing = newlyFetchedFollowings.findIndex((following) => following.pk === follower.pk);
    if (isAlsoFollowing >= 0) {
      connections.push({ ...follower, connectionTypeId: ConnectionTypeEnum["FOLLOWER_FOLLOWING"] });
    } else {
      connections.push({ ...follower, connectionTypeId: ConnectionTypeEnum["FOLLOWER_"] });
    }
  });
  newlyFetchedFollowings.forEach((following) => {
    const isAlsoFollower = newlyFetchedFollowers.findIndex((follower) => following.pk === follower.pk);
    if (isAlsoFollower === -1) {
      connections.push({ ...following, connectionTypeId: ConnectionTypeEnum["_FOLLOWING"] });
    }
  });
  if (currentConnectionsInDb) {
    currentConnectionsInDb.forEach((currentConnection) => {
      if (
        ![...newlyFetchedFollowers, ...newlyFetchedFollowings].find((newConnection) => String(newConnection.pk) === currentConnection.pk)
      ) {
        connections.push({
          connectionTypeId: ConnectionTypeEnum["NONE"],
          full_name: currentConnection.fullName,
          pk: Number(currentConnection.pk),
          profile_pic_url: currentConnection.profilePicUrl,
          username: currentConnection.username,
        });
      }
    });
  }
  return connections;
};

const updateConnections = async (connections: UserConnectionType[], userId: number) => {
  for (const connection of connections) {
    const existingConnection = await prisma.connection.findFirst({
      where: { userId, pk: String(connection.pk) },
    });
    if (!existingConnection || !connection.connectionTypeId) {
      logger.error("existingConnection does not exist. ERROR IN CODE");
      throw new Error("");
    }
    await prisma.connection.update({
      where: { id: existingConnection.id },
      data: {
        connectionHistory: {
          create: {
            connectionTypeId: connection.connectionTypeId,
          },
        },
      },
    });
  }
};

export const getUserInfo = async (username: string) => {
  logger.debug("Getting User Info");
  return prisma.user.findFirst({ where: { username } });
};

export const createUser = async (userData: FullInstagramUserDataType) => {
  logger.debug("Creating User");
  const connections = getProcessedConnections(userData.userFollowers, userData.userFollowings);
  console.log("---------\nUSER INFO");
  console.log(userData.userInfo);
  console.log("---------\nUSER CONNECTIONS");
  console.log(connections);
  const createdUser = await prisma.user.create({
    data: {
      ...userData.userInfo,
      connections: {
        create: connections.map((connection) => ({
          fullName: connection.full_name,
          pk: String(connection.pk),
          profilePicUrl: connection.profile_pic_url,
          username: connection.username,
          [connection.connectionTypeId ? "connectionHistory" : ""]: {
            create: {
              connectionTypeId: connection.connectionTypeId,
            },
          },
        })),
      },
    },
  });
  logger.debug("User Created");
  return createdUser;
};

export const updateUser = async (
  user: User & {
    connections: Connection[];
  }
) => {
  logger.debug(`Updating ${user.username} (${user.pk})(${user.id})`);
  const userInfo = await instagrapi.getUserInfo(user.pk);
  const allNewfollowers = await instagrapi.getFollowers(user.pk);
  const allNewfollowings = await instagrapi.getFollowings(user.pk);
  logger.debug("Executin Update on User Record");
  const currentConnections = await prisma.connection.findMany({
    where: { userId: user.id },
    include: {
      connectionHistory: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });
  const newConnections = getProcessedConnections(allNewfollowers, allNewfollowings, currentConnections);
  const connectionsToAdd: UserConnectionType[] = [];
  const connectionsToUpdate: UserConnectionType[] = [];
  newConnections.forEach((newConnection) => {
    const existingConnection = currentConnections.find((currentConnection) => currentConnection.pk === String(newConnection.pk));
    if (!existingConnection) {
      connectionsToAdd.push(newConnection);
    } else if (existingConnection.connectionHistory[0].connectionTypeId !== newConnection.connectionTypeId) {
      connectionsToUpdate.push(newConnection);
    }
  });
  const [updatedUser] = await Promise.all([
    prisma.user.update({
      where: { id: user.id },
      data: {
        username: userInfo.username,
        biography: userInfo.biography,
        isPrivate: userInfo.is_private,
        followerCount: userInfo.follower_count,
        followingCount: userInfo.following_count,
        isVerified: userInfo.is_verified,
        profilePicUrl: userInfo.profile_pic_url,
        profilePicUrlHd: userInfo.profile_pic_url_hd,
        connections: {
          create: connectionsToAdd.map((connection) => ({
            fullName: connection.full_name,
            pk: String(connection.pk),
            profilePicUrl: connection.profile_pic_url,
            username: connection.username,
            [connection.connectionTypeId ? "connectionHistory" : ""]: {
              create: {
                connectionTypeId: connection.connectionTypeId,
              },
            },
          })),
        },
      },
    }),
    updateConnections(connectionsToUpdate, user.id),
  ]);
  return updatedUser;
};

export const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findFirst({ where: { username } });
  return user;
};
