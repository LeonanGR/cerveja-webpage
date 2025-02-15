import os
import matplotlib.pyplot as plt
from flask import Flask, render_template
import mysql.connector
import datetime

app = Flask(__name__)

# Conectar ao banco de dados
def get_data():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="cerveja_db"
    )
    cursor = conn.cursor()
    cursor.execute("SELECT horario, temperatura FROM temp ORDER BY horario")
    data = cursor.fetchall()
    conn.close()
    return data

@app.route("/")
def index():
    # Buscar dados do banco
    data = get_data()
    horarios = [row[0] for row in data]
    temperaturas = [row[1] for row in data]

    # Criar o gráfico
    plt.figure(figsize=(10, 5))
    plt.plot(horarios, temperaturas, marker='o', linestyle='-')
    plt.xlabel("Horário")
    plt.ylabel("Temperatura (°C)")
    plt.title("Temperatura ao longo do tempo")
    plt.xticks(rotation=45)
    plt.grid()

    # Criar pasta static se não existir
    if not os.path.exists("static"):
        os.makedirs("static")

    # Salvar o gráfico
    caminho_imagem = "static/grafico.png"
    plt.savefig(caminho_imagem, bbox_inches="tight")
    plt.close()

    return render_template("grafico.html", grafico=caminho_imagem)

if __name__ == "__main__":
    app.run(debug=True)