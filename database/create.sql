DROP DATABASE IF EXISTS movilist;
CREATE DATABASE movilist;
USE movilist;

CREATE TABLE roles (
   id INT not null auto_increment primary key,
   name VARCHAR(500)
);

CREATE TABLE genres (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(250)
);

CREATE TABLE status (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(250)
);

CREATE TABLE users (
   id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
   username VARCHAR(100),
   email VARCHAR(150) UNIQUE,
   password VARCHAR(1000),
   role_id INT default 2 NOT NULL,
   constraint FK_users_role_id foreign key(role_id) references roles(id)
);


CREATE TABLE movies (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(250),
    description TEXT,
    release_date DATE,
    genre_id INT,
    image_url VARCHAR(250),
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);

CREATE TABLE userMovies (
    user_id INT,
    movie_id INT,
    status_id INT,
    rating INT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (status_id) REFERENCES status(id)
);
