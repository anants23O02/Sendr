-- CreateTable
CREATE TABLE "Message" (
    "mid" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "contacts" INTEGER[],
    "schedule" TIMESTAMP(3)[],

    CONSTRAINT "Message_pkey" PRIMARY KEY ("mid")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
