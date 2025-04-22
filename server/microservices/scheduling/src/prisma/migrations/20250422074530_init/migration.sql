-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('SMS', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('SENT', 'SCHEDULED', 'FAILED', 'DELIVERED', 'PENDING');

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "messageType" "MessageType" NOT NULL,
    "contacts" INTEGER[],
    "status" "MessageStatus" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "messageTime" TIMESTAMP(3) NOT NULL,
    "numberoftimesSent" INTEGER NOT NULL,
    "gapBetweenMessages" INTEGER NOT NULL,
    "messageCount" INTEGER NOT NULL,
    "messageSentCount" INTEGER NOT NULL,
    "messagesDateTime" TIMESTAMP(3)[],
    "messageWeeklyCount" INTEGER NOT NULL,
    "messageMonthlyCount" INTEGER NOT NULL,
    "messageYearlyCount" INTEGER NOT NULL,
    "messageDailyCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "senderId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
