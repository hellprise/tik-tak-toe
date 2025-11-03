/*
  Warnings:

  - The values [idle,inProgress,gameOver,gameOverDraw] on the enum `GameStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GameStatus_new" AS ENUM ('IDLE', 'IN_PROGRESS', 'GAME_OVER', 'GAME_OVER_DRAW');
ALTER TABLE "Game" ALTER COLUMN "status" TYPE "GameStatus_new" USING ("status"::text::"GameStatus_new");
ALTER TYPE "GameStatus" RENAME TO "GameStatus_old";
ALTER TYPE "GameStatus_new" RENAME TO "GameStatus";
DROP TYPE "public"."GameStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "status" SET DEFAULT 'IDLE';
