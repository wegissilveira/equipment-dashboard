INSERT INTO dealers (name)
SELECT 'ABC Equipment'
WHERE NOT EXISTS (SELECT 1 FROM dealers WHERE name = 'ABC Equipment');

INSERT INTO dealers (name)
SELECT 'United Rentals'
WHERE NOT EXISTS (SELECT 1 FROM dealers WHERE name = 'United Rentals');

INSERT INTO equipment (name, model, status, dealer_id)
SELECT 'Excavator', 'Heavy', 'Available', dealers.id
FROM dealers
WHERE dealers.name = 'ABC Equipment'
  AND NOT EXISTS (SELECT 1 FROM equipment WHERE name = 'Excavator');

INSERT INTO equipment (name, model, status, dealer_id)
SELECT 'Crane', 'Heavy', 'Rented', dealers.id
FROM dealers
WHERE dealers.name = 'United Rentals'
  AND NOT EXISTS (SELECT 1 FROM equipment WHERE name = 'Crane');

INSERT INTO equipment (name, model, status, dealer_id)
SELECT 'Bulldozer', 'Earthmoving', 'Available', dealers.id
FROM dealers
WHERE dealers.name = 'ABC Equipment'
  AND NOT EXISTS (SELECT 1 FROM equipment WHERE name = 'Bulldozer');
