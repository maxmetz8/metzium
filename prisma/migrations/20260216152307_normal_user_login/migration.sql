-- This migration can run before the columns exist in production.
-- Keep it as a no-op when firstName/lastName are not present yet.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'User'
      AND column_name = 'firstName'
  ) AND EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'User'
      AND column_name = 'lastName'
  ) THEN
    ALTER TABLE "User"
      ALTER COLUMN "firstName" DROP DEFAULT,
      ALTER COLUMN "lastName" DROP DEFAULT;
  END IF;
END $$;
