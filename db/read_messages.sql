SELECT * FROM Messages m
JOIN Users u WHERE m.user_id = u.id
WHERE user_id = $1;