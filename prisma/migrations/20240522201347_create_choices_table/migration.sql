-- CreateTable
CREATE TABLE "Choices" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "menuId" INTEGER NOT NULL,
    "extras" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Choices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Choices" ADD CONSTRAINT "Choices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Choices" ADD CONSTRAINT "Choices_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
