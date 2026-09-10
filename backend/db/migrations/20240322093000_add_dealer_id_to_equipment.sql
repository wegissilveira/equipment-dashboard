ALTER TABLE equipment
ADD COLUMN dealer_id INTEGER REFERENCES dealers(id);
