import { ConnectionActionType } from "./main.types";

export type GetConnectionsByDaysControllerResponseType = {
  [key: string]: {
    [key in ConnectionActionType]: {
      username: string;
      fullName: string;
      thisConnectionIndexInHistory: number;
      connectionHistory: {
        createdAt: Date;
        connectionTypeId: number;
      }[];
    }[];
  };
};
