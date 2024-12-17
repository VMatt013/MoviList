CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user'
);

CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    release_date DATE,
    poster_url VARCHAR(255)
);

CREATE TABLE status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name ENUM('Watching', 'Completed', 'Planning', 'Dropped') NOT NULL
);

CREATE TABLE userMovies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    status_id INT NOT NULL,
    rating DECIMAL(2, 1) DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (status_id) REFERENCES status(id) ON DELETE CASCADE,
    UNIQUE(user_id, movie_id)
);

INSERT INTO status (name) VALUES 
('Watching'), 
('Completed'), 
('Planning'), 
('Dropped');
