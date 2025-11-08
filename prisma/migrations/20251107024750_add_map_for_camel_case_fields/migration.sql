/*
  Warnings:

  - You are about to drop the column `gameOverAt` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `winnerId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `GamePlayer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `GamePlayer` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - Added the required column `game_id` to the `GamePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `GamePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Game" DROP CONSTRAINT "Game_winnerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GamePlayer" DROP CONSTRAINT "GamePlayer_gameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GamePlayer" DROP CONSTRAINT "GamePlayer_userId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "gameOverAt",
DROP COLUMN "winnerId",
ADD COLUMN     "game_over_at" TEXT,
ADD COLUMN     "winner_id" TEXT;

-- AlterTable
ALTER TABLE "GamePlayer" DROP COLUMN "gameId",
DROP COLUMN "userId",
ADD COLUMN     "game_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordHash",
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "GamePlayer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePlayer" ADD CONSTRAINT "GamePlayer_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePlayer" ADD CONSTRAINT "GamePlayer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
