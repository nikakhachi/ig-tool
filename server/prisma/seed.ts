import { prisma } from ".";
import logger from "../utils/logger";
import { ConnectionTypeEnum } from "../types/enums";

const seedConnectionType = async () => {
  const connectionTypes = Object.keys(ConnectionTypeEnum).filter((v) => isNaN(Number(v))) as (keyof typeof ConnectionTypeEnum)[];
  try {
    await prisma.connectionType.createMany({
      data: connectionTypes.map((type) => ({
        name: type,
        id: ConnectionTypeEnum[type],
      })),
    });
    logger.info("Connection Types seeded Successfully.");
  } catch (error) {
    logger.error("Connection Types seed Failed.");
  }
};

seedConnectionType();
