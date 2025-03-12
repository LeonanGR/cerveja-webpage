const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3006;

// Middleware para permitir requisições de outras origens (CORS) e interpretar JSON
app.use(cors());
app.use(bodyParser.json());

// Diretório onde o CSV será salvo
const csvDir = path.join(__dirname, '../csv');
const filePath = path.join(csvDir, 'dados.csv');

// Criar a pasta `csv/` caso não exista
if (!fs.existsSync(csvDir)) {
    fs.mkdirSync(csvDir, { recursive: true });
}

// Função para adicionar cabeçalho caso o arquivo esteja vazio
function verificarCabecalho() {
    if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
        const cabecalho = 'Nome,Idade,Nota da Embalagem,Gênero,Formação,Estado,Município\n';
        fs.writeFileSync(filePath, cabecalho, 'utf8');
    }
}

// Rota para receber os dados do formulário e salvar no CSV
app.post('/salvar', (req, res) => {
    const { nome, idade, nota_embalagem, genero, formacao, estado, municipio } = req.body;

    if (!nome || !idade || !nota_embalagem || !genero || !estado || !municipio) {
        return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos!' });
    }

    const novaLinha = `${nome},${idade},${nota_embalagem},${genero},${formacao || ''},${estado},${municipio}\n`;

    // Verifica se o cabeçalho precisa ser adicionado antes de salvar os dados
    verificarCabecalho();

    // Adiciona os dados ao arquivo CSV
    fs.appendFile(filePath, novaLinha, (err) => {
        if (err) {
            console.error('Erro ao salvar os dados:', err);
            return res.status(500).json({ erro: 'Erro ao salvar os dados!' });
        }
        console.log('Dados salvos com sucesso!');
        res.status(200).json({ mensagem: 'Dados salvos com sucesso!' });
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
