CREATE TABLE equipment (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  model TEXT,
  status TEXT
);

CREATE TABLE dealers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

ALTER TABLE equipment
ADD COLUMN dealer_id INTEGER REFERENCES dealers(id);

INSERT INTO dealers (name)
VALUES
  ('ABC Equipment'),
  ('United Rentals');

INSERT INTO equipment (name, model, status, dealer_id)
VALUES
  ('Excavator', 'Heavy', 'Available', 1),
  ('Crane', 'Heavy', 'Rented', 2),
  ('Bulldozer', 'Earthmoving', 'Available', 1);