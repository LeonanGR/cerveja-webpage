import mysql.connector
import sys
import matplotlib.pyplot as plt
import matplotlib.dates as mdates

sys.stdout.reconfigure(encoding='utf-8')

# Conectar ao banco de dados
conexao = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="cerveja_db",
    port=3306
)

cursor = conexao.cursor()

# Buscar os dados da tabela
comando = "SELECT temperatura, horario FROM temp ORDER BY horario"
cursor.execute(comando)
dados = cursor.fetchall()

cursor.close()
conexao.close()

# Separar os dados para o gráfico
temperaturas = [linha[0] for linha in dados]
horarios = [linha[1] for linha in dados]

# Criar o gráfico
plt.figure(figsize=(10, 5))
plt.plot(horarios, temperaturas, marker='o', linestyle='-', color='b', label='Temperatura')

# Formatar o eixo X para exibir melhor as datas/horários
plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%H:%M:%S'))  #

print(dados)
plt.show()