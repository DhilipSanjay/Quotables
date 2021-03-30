USE quotables;

CREATE TABLE users (
  uid int PRIMARY KEY AUTO_INCREMENT,
  username varchar(30) NOT NULL,
  email varchar(30) UNIQUE NOT NULL,
  passwd varchar(32) NOT NULL,
  bio varchar(200) DEFAULT NULL
);

CREATE TABLE quotes (
  uid int NOT NULL,
  qid int PRIMARY KEY AUTO_INCREMENT,
  quote varchar(200) NOT NULL,
  author varchar(30) NOT NULL DEFAULT "Anonymous",
  FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);

CREATE TABLE tags(
  tagid int PRIMARY KEY AUTO_INCREMENT,
  tagname varchar(30) NOT NULL
);

CREATE TABLE quotes_tags(
  qid int NOT NULL,
  tagid int NOT NULL,
  PRIMARY KEY (qid, tagid),
  FOREIGN KEY (qid) REFERENCES quotes(qid) ON DELETE CASCADE,
  FOREIGN KEY (tagid) REFERENCES tags(tagid) ON DELETE CASCADE
);