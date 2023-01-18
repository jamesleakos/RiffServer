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
  firebase_id TEXT,
  online BOOLEAN
);

COPY users
FROM '/Users/chris/Desktop/hackreactor/RiffServer/data/users.csv'
DELIMITER ','
CSV HEADER;

SELECT setval('users_id_seq', max(id)) FROM users;

CREATE TABLE IF NOT EXISTS servers (
  id SERIAL NOT NULL PRIMARY KEY,
  server_name TEXT,
  private BOOLEAN,
  admin_id INTEGER NOT NULL REFERENCES users (id),
  UNIQUE (server_name, admin_id)
);

COPY servers
FROM '/Users/chris/Desktop/hackreactor/RiffServer/data/servers.csv'
DELIMITER ','
CSV HEADER;

SELECT setval('servers_id_seq', max(id)) FROM servers;

CREATE TABLE IF NOT EXISTS channels (
  id SERIAL NOT NULL PRIMARY KEY,
  channel_name TEXT,
  server_id INTEGER REFERENCES servers (id),
  UNIQUE(channel_name, server_id)
);

COPY channels
FROM '/Users/chris/Desktop/hackreactor/RiffServer/data/channels.csv'
DELIMITER ','
CSV HEADER;

SELECT setval('channels_id_seq', max(id)) FROM channels;

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
FROM '/Users/chris/Desktop/hackreactor/RiffServer/data/messages.csv'
DELIMITER ','
CSV HEADER
NULL AS '0';

SELECT setval('messages_id_seq', max(id)) FROM messages;

CREATE TABLE IF NOT EXISTS friends (
  id SERIAL NOT NULL PRIMARY KEY,
  user_id INTEGER,
  friend_id INTEGER
);

COPY friends
FROM '/Users/chris/Desktop/hackreactor/RiffServer/data/friends.csv'
DELIMITER ','
CSV HEADER;

SELECT setval('friends_id_seq', max(id)) FROM friends;

CREATE TABLE IF NOT EXISTS servers_users (
  id SERIAL NOT NULL PRIMARY KEY,
  user_id INTEGER,
  server_id INTEGER
);

COPY servers_users
FROM '/Users/chris/Desktop/hackreactor/RiffServer/data/servers_users.csv'
DELIMITER ','
CSV HEADER;

SELECT setval('servers_users_id_seq', max(id)) FROM servers_users;