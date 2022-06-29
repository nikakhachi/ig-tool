-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pk" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "followerCount" INTEGER NOT NULL,
    "followingCount" INTEGER NOT NULL,
    "profilePicUrl" TEXT,
    "profilePicUrlHd" TEXT,
    "isPrivate" BOOLEAN,
    "isVerified" BOOLEAN,
    "biography" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connection" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pk" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "profilePicUrl" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConnectionHistory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "connectionTypeId" INTEGER NOT NULL,
    "connectionId" INTEGER NOT NULL,

    CONSTRAINT "ConnectionHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConnectionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ConnectionType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConnectionHistory" ADD CONSTRAINT "ConnectionHistory_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConnectionHistory" ADD CONSTRAINT "ConnectionHistory_connectionTypeId_fkey" FOREIGN KEY ("connectionTypeId") REFERENCES "ConnectionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
