create database cerveja_db;
use cerveja_db;

create table temp(
id int primary key auto_increment,
temperatura float,
horario datetime default now()
);

create table usuarios(
id int primary key auto_increment,
nome varchar(40),
idade int,
nota int,
genero char(1),
formacao varchar(20) default'',
estado char(2),
municipio varchar(30)
);