export enum ConnectionTypeEnum {
  _FOLLOWING = 1,
  FOLLOWER_,
  FOLLOWER_FOLLOWING,
  NONE,
}
export const connectionTypes = Object.keys(ConnectionTypeEnum).filter((v) => isNaN(Number(v))) as (keyof typeof ConnectionTypeEnum)[];
export type ConnectionTypeType = "_FOLLOWING" | "FOLLOWER_" | "FOLLOWER_FOLLOWING" | "NONE";
