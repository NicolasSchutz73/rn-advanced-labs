-- db/migrations/003_add_archived.sql
ALTER TABLE robots ADD COLUMN archived INTEGER NOT NULL DEFAULT 0;
