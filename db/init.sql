DROP TABLE IF EXISTS Messages, ChatRooms, Users;


CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    avatar TEXT NOT NULL
);
INSERT INTO Users 
(username, password, avatar)
VALUES 
('Jim', 'j', 'https://i.pinimg.com/originals/c6/5d/ec/c65decba6e1c8af93a2ff555da94350b.jpg'),
('Octo', 'o', 'https://i.pinimg.com/originals/22/ff/77/22ff7770465dcb1f18de589a52d9a72c.jpg');


CREATE TABLE Messages (
    id SERIAL PRIMARY KEY,
    message VARCHAR(500) NOT NULL,
    date_posted TEXT NOT NULL,
    user_id INTEGER REFERENCES Users (id) NOT NULL,
    -- chat_room_id INTEGER REFERENCES ChatRooms (id) NOT NULL
);


-- CREATE TABLE ChatRooms (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL
-- );