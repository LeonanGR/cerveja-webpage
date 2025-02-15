INSERT INTO temp(temperatura, horario) VALUES
('120', now());

SELECT * FROM temp;
#UPDATE temp SET horario = '2025-02-14 18:37:00' WHERE id = 1;
#DELETE FROM temp WHERE id >0;

ALTER USER 'root'@'localhost' IDENTIFIED BY '';
FLUSH PRIVILEGES;
SELECT VERSION();