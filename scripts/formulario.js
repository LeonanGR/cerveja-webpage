document.addEventListener('DOMContentLoaded', function() {
    const estadoSelect = document.getElementById('estado');
    const municipioSelect = document.getElementById('municipio');

    // Função para carregar os estados
    function carregarEstados() {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => response.json())
            .then(estados => {
                // Ordena os estados em ordem alfabética
                estados.sort((a, b) => a.nome.localeCompare(b.nome));

                // Adiciona os estados ao select
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
                // Limpa o select de municípios
                municipioSelect.innerHTML = '<option value="">Selecione um município</option>';

                // Adiciona os municípios ao select
                municipios.forEach(municipio => {
                    const option = document.createElement('option');
                    option.value = municipio.id;
                    option.textContent = municipio.nome;
                    municipioSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao carregar os municípios:', error));
    }

    // Evento para quando o estado é selecionado
    estadoSelect.addEventListener('change', function() {
        const estadoId = this.value;
        if (estadoId) {
            carregarMunicipios(estadoId);
        } else {
            municipioSelect.innerHTML = '<option value="">Selecione um município</option>';
        }
    });

    // Carrega os estados ao carregar a página
    carregarEstados();
});
