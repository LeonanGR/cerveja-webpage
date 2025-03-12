INSERT INTO temp(temperatura, horario) VALUES
('120', now());

INSERT INTO form(nome, idade, nota, genero, formacao, estado, municipio) VALUES
('Ney', 30, 10, 'M', 'Influencer', 'SP', 'Santos');

SELECT * FROM temp;
#UPDATE temp SET horario = '2025-02-14 18:37:00' WHERE id = 1;
#DELETE FROM temp WHERE id >0;
#SELECT horario, temperatura FROM temp WHERE horario BETWEEN '2025-02-15 20:00:00' AND '2025-02-15 20:10:00';

SELECT * FROM usuarios;
#RENAME TABLE form TO usuarios;

ALTER USER 'root'@'localhost' IDENTIFIED BY '';
FLUSH PRIVILEGES;
SELECT VERSION();