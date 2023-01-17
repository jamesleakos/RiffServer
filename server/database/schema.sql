DROP DATABASE IF EXISTS riff;

CREATE DATABASE riff;

\c riff

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS channels CASCADE;
DROP TABLE IF EXISTS servers CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS friends CASCADE;
DROP TABLE IF EXISTS servers_users CASCADE;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL NOT NULL PRIMARY KEY,
  username TEXT UNIQUE,
  firebase_id TEXT
);

COPY users
FROM '/Users/christopherwong/Documents/Hack reactor/bootcamp/BlueOceanDevelopment/RiffServer/data/users.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS servers (
  id SERIAL NOT NULL PRIMARY KEY,
  server_name TEXT,
  private BOOLEAN,
  admin_id INTEGER NOT NULL REFERENCES users (id),
  UNIQUE (server_name, admin_id)
);

COPY servers
FROM '/Users/christopherwong/Documents/Hack reactor/bootcamp/BlueOceanDevelopment/RiffServer/data/servers.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS channels (
  id SERIAL NOT NULL PRIMARY KEY,
  channel_name TEXT,
  server_id INTEGER REFERENCES servers (id),
  UNIQUE(channel_name, server_id)
);

COPY channels
FROM '/Users/christopherwong/Documents/Hack reactor/bootcamp/BlueOceanDevelopment/RiffServer/data/channels.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL NOT NULL PRIMARY KEY,
  message TEXT,
  server_id INTEGER REFERENCES servers (id),
  channel_id INTEGER REFERENCES channels (id),
  user_id INTEGER NOT NULL REFERENCES users (id),
  recipient_id INTEGER,
  created_at TEXT
);

COPY messages
FROM '/Users/christopherwong/Documents/Hack reactor/bootcamp/BlueOceanDevelopment/RiffServer/data/messages.csv'
DELIMITER ','
CSV HEADER
NULL AS '0';

CREATE TABLE IF NOT EXISTS friends (
  id SERIAL NOT NULL PRIMARY KEY,
  user_id INTEGER,
  friend_id INTEGER
);

COPY friends
FROM '/Users/christopherwong/Documents/Hack reactor/bootcamp/BlueOceanDevelopment/RiffServer/data/friends.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS servers_users (
  id SERIAL NOT NULL PRIMARY KEY,
  user_id INTEGER,
  server_id INTEGER
);

COPY servers_users
FROM '/Users/christopherwong/Documents/Hack reactor/bootcamp/BlueOceanDevelopment/RiffServer/data/servers_users.csv'
DELIMITER ','
CSV HEADER;