document.addEventListener('DOMContentLoaded', function() {
    const estadoSelect = document.getElementById('estado');
    const municipioSelect = document.getElementById('municipio');

    // Função para carregar os estados
    function carregarEstados() {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => response.json())
            .then(estados => {
                estados.sort((a, b) => a.nome.localeCompare(b.nome)); // Ordenação alfabética
                estados.forEach(estado => {
                    const option = document.createElement('option');
                    option.value = estado.id;
                    option.textContent = estado.nome;
                    estadoSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar os estados:', error));
    }

    // Função para carregar os municípios com base no estado selecionado
    function carregarMunicipios(estadoId) {
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
            .then(response => response.json())
            .then(municipios => {
                municipioSelect.innerHTML = '<option value="">Selecione um município</option>'; // Limpa antes de adicionar novos

                municipios.forEach(municipio => {
                    const option = document.createElement('option');
                    option.value = municipio.id;
                    option.textContent = municipio.nome;
                    municipioSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar os municípios:', error));
    }

    // Evento de mudança do estado
    estadoSelect.addEventListener('change', function() {
        const estadoId = this.value;
        if (estadoId) {
            carregarMunicipios(estadoId);
        } else {
            municipioSelect.innerHTML = '<option value="">Selecione um município</option>';
        }
    });

    carregarEstados(); // Carregar estados ao iniciar a página
});