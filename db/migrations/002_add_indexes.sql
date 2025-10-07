-- db/migrations/002_add_indexes.sql
CREATE INDEX idx_robots_name ON robots(name);
CREATE INDEX idx_robots_year ON robots(year);
