-- CreateTable
CREATE TABLE "ItemLog" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "ItemLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemLog" ADD CONSTRAINT "ItemLog_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
