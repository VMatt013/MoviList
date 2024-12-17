INSERT INTO users (username, email, password, role) VALUES
('john_doe', 'john@example.com', 'password123', 'user'),
('jane_smith', 'jane@example.com', 'password123', 'user'),
('admin_user', 'admin@example.com', 'admin123', 'admin');

INSERT INTO movies (title, description, release_date, poster_url) VALUES
('Inception', 'A mind-bending thriller about dreams within dreams.', '2010-07-16', 'https://example.com/inception.jpg'),
('The Matrix', 'A computer hacker learns about the true nature of reality.', '1999-03-31', 'https://example.com/matrix.jpg'),
('Interstellar', 'A team of astronauts travels through a wormhole in search of a new home for humanity.', '2014-11-07', 'https://example.com/interstellar.jpg'),
('The Dark Knight', 'Batman faces his greatest enemy, the Joker, in Gotham City.', '2008-07-18', 'https://example.com/dark_knight.jpg');


INSERT INTO userMovies (user_id, movie_id, status_id, rating) VALUES
(1, 1, 1, NULL), -- John is Watching Inception
(1, 2, 2, 5.0), -- John has Completed The Matrix with a 5.0 rating
(1, 3, 3, NULL), -- John is Planning to watch Interstellar
(1, 4, 4, NULL), -- John has Dropped The Dark Knight
(2, 1, 2, 4.5), -- Jane has Completed Inception with a 4.5 rating
(2, 2, 1, NULL), -- Jane is Watching The Matrix
(2, 3, 3, NULL), -- Jane is Planning to watch Interstellar
(2, 4, 4, NULL); -- Jane has Dropped The Dark Knight
