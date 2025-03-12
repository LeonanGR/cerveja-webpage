document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formulario').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Captura os dados do formulário
        const formData = {
            nome: document.getElementById('nome').value,
            idade: document.getElementById('idade').value,
            nota_embalagem: document.getElementById('nota_embalagem').value,
            genero: document.querySelector('input[name="genero"]:checked')?.id || '',
            formacao: document.getElementById('formacao').value,
            estado: document.getElementById('estado').options[document.getElementById('estado').selectedIndex].text,
            municipio: document.getElementById('municipio').options[document.getElementById('municipio').selectedIndex].text
        };

        // **Envia os dados para o servidor e adiciona ao CSV**
        fetch('http://localhost:3006/salvar', { // Porta corrigida para 3006
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert(`${data.mensagem}`);
            console.log(`Dados salvos no servidor:`, formData);
        })
        .catch(error => console.error('Erro ao enviar os dados:', error));
    });
});
