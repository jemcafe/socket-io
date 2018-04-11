INSERT INTO Users
(username, password, avatar)
VALUES
($1, $2, $3)
RETURNING *;