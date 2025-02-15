const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3006;

app.use(cors());
app.use(express.json()); // Permite JSON no body das requisições

// Configurar a conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cerveja_db'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar:', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});

// Rota para inserir dados na tabela
app.post('/add', (req, res) => {
    const { temperatura } = req.body;
    if (!temperatura) {
        return res.status(400).json({ error: 'Temperatura é obrigatória' });
    }

    const sql = 'INSERT INTO temp (temperatura, horario) VALUES (?, NOW())';
    db.query(sql, [temperatura], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao inserir' });
        }
        res.json({ message: 'Inserido com sucesso', id: result.insertId });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
