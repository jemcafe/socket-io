DROP TABLE IF EXISTS Messages;

CREATE TABLE Messages (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    message VARCHAR(500) NOT NULL
);