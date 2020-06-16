CREATE TABLE profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  equipment_ids TEXT
);

CREATE TABLE equipment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);

INSERT INTO equipment (name) VALUES
  ("Barbells"),
  ("Dumbbells"),
  ("Row"),
  ("Bike"),
  ("Skierg"),
  ("Wall Balls"),
  ("Kettle Bell"),
  ("Pull Up Bar"),
  ("Sled");