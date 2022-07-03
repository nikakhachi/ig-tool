import getFullUserDataByPk from "./getFullUserDataByPk";
import getUserId from "./getUserId";

export default async (username: string) => {
  const { id: userPk } = await getUserId(username);
  return getFullUserDataByPk(userPk);
};
