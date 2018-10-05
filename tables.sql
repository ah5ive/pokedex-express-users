CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  name TEXT,
  password TEXT
);

CREATE TABLE IF NOT EXISTS pokemon(
	id SERIAL PRIMARY KEY,
	name TEXT,
	img TEXT,
	weight VARCHAR(10),
	height VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS users_pokemon(
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  pokemon_id INTEGER
);