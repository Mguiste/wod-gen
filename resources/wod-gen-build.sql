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
  ("barbells"),
  ("dumbbells"),
  ("row"),
  ("bike"),
  ("skierg"),
  ("wall balls"),
  ("kettle bell"),
  ("pull up bar"),
  ("sled");