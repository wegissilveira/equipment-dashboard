-- Current schema snapshot. Do not apply this in CI or production.
-- New changes go in db/migrations/; then update this file to match.

CREATE TABLE dealers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE equipment (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  model TEXT,
  status TEXT,
  dealer_id INTEGER REFERENCES dealers(id)
);
