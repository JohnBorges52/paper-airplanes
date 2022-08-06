DROP TABLE IF EXISTS user_stickers CASCADE;

CREATE TABLE user_stickers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255)
);
