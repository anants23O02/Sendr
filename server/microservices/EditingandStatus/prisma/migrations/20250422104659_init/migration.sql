-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "statusStatusId" INTEGER;

-- CreateTable
CREATE TABLE "Status" (
    "statusId" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "messageId" INTEGER NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("statusId")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_statusStatusId_fkey" FOREIGN KEY ("statusStatusId") REFERENCES "Status"("statusId") ON DELETE SET NULL ON UPDATE CASCADE;
