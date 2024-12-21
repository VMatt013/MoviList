DELETE FROM userMovies;
DELETE FROM roles;
DELETE FROM genres;
DELETE FROM status;
DELETE FROM users;
DELETE FROM movies;


INSERT INTO roles (name) VALUES
('Admin'),
('User');


INSERT INTO genres (name) VALUES
('Action'),
('Comedy'),
('Drama'),
('Horror'),
('Sci-Fi'),
('Romance'),
('Adventure'),
('Thriller'),
('Fantasy'),
('Mystery'),
('Documentary'),
('Animation'),
('Family'),
('Crime'),
('Musical'),
('Historical'),
('Biography'),
('War'),
('Western'),
('Superhero'),
('Sports');

INSERT INTO status (name) VALUES
('Planned'),
('Watching'),
('Completed'),
('Dropped');

INSERT INTO users (username, email, password, role_id) VALUES
('admin', 'admin@gmail.com', '$2a$10$px0lHQ5PGn.8DEG3eLx91eNQqpoHEvmYT5Ikxx5iWRuFQJnTqGg0y', 1),
('user', 'user@gmail.com', '$2a$10$lJjhn56kIlwI6rpRucNr1uIE5IKLhrwRtRhVNM3lFRBh4MQcAvnc.', 2);

INSERT INTO movies (title, description, release_date, genre_id, image_url) VALUES
('The Dark Knight', 'Batman faces off against the Joker, a criminal mastermind who wants to plunge Gotham City into anarchy.', '2008-07-18', 20, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg'),
('Inception', 'A skilled thief is given a chance to have his criminal history erased if he can successfully perform inception: planting an idea in someone\'s subconscious.', '2010-07-16', 5, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg'),
('The Matrix', 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', '1999-03-31', 5, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'),
('Titanic', 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.', '1997-12-19', 6, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg'),
('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', '1972-03-24', 14, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'),
('Avatar', 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.', '2009-12-18', 9, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kyeqWdyUXW608qlYkRqosgbbJyK.jpg'),
('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', '1994-09-23', 3, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg'),
('Interstellar', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', '2014-11-07', 5, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'),
('Gladiator', 'A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family and sent him into slavery.', '2000-05-05', 16, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg'),
('The Lion King', 'A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.', '1994-06-15', 12, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg'),
('Jurassic Park', 'During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run riot.', '1993-06-11', 7, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg'),
('Forrest Gump', 'The presidencies of Kennedy and Johnson, the events of Vietnam, the Nixon years, the Watergate scandal, and more unfold from the perspective of an Alabama man with an extraordinary life.', '1994-07-06', 3, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg'),
('Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', '1994-10-14', 14, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'),
('Fight Club', 'An insomniac office worker and a soap salesman form an underground fight club that evolves into much more.', '1999-10-15', 3, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'),
('The Lord of the Rings: The Fellowship of the Ring', 'A young hobbit, Frodo Baggins, is tasked with destroying a powerful ring to save Middle-Earth.', '2001-12-19', 9, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg'),
('Star Wars: Episode V - The Empire Strikes Back', 'After the Rebels are overpowered by the Empire, Luke Skywalker begins Jedi training with Yoda while his friends are pursued by Darth Vader.', '1980-05-21', 5, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/nNAeTmF4CtdSgMDplXTDPOpYzsX.jpg'),
('The Avengers', 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are to stop Loki and his alien army from enslaving humanity.', '2012-05-04', 20, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg'),
('Shrek', 'A grumpy yet lovable ogre embarks on a quest to rescue a princess, while learning lessons about friendship and love.', '2001-04-22', 12, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg'),
('Frozen', 'When their kingdom becomes trapped in eternal winter, fearless Anna teams with rugged iceman Kristoff to find her estranged sister Elsa and break the spell.', '2013-11-27', 12, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/itAKcobTYGpYT8Phwjd8c9hleTo.jpg'),
('The Social Network', 'Mark Zuckerberg creates Facebook, but the creation of the social media giant comes with great personal and legal challenges.', '2010-10-01', 3, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg'),
('The Wolf of Wall Street', 'Based on the true story of Jordan Belfort, who was a stockbroker that engaged in corruption and fraud on Wall Street.', '2013-12-25', 3, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/34m2tygAYBGqA9MXKhRDtzYd4MR.jpg'),
('Dune', 'A young nobleman becomes embroiled in a war for control over the desert planet Arrakis, the galaxy\'s only source of the spice melange.', '2021-10-22', 5, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/d5NXSklXo0qyIYkgV94XAgMIckC.jpg'),
('Coco', 'Aspiring musician Miguel enters the Land of the Dead to find his great-great-grandfather, a legendary singer.', '2017-11-22', 12, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg'),
('Black Panther', 'T\'Challa returns home to Wakanda to take his place as king, but faces a challenge to his throne and a threat to his kingdom.', '2018-02-16', 20, 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uxzzxijgPIY7slzFvMotPv8wjKA.jpg');
