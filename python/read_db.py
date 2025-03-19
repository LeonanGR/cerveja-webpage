import time
import mysql.connector
import matplotlib.pyplot as plt
import pandas as pd
from datetime import datetime

def conectar_bd():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="cerveja_db"
    )

def gerar_grafico():
    try:
        conexao = conectar_bd()
        cursor = conexao.cursor()
        cursor.execute("SELECT horario, temperatura FROM temp ORDER BY horario DESC LIMIT 100")
        
        dados = cursor.fetchall()
        
        if dados:
            df = pd.DataFrame(dados, columns=['horario', 'temperatura'])
            df['horario'] = pd.to_datetime(df['horario'])
            df.sort_values(by='horario', inplace=True)
            
            plt.style.use('dark_background')
            plt.figure(figsize=(10, 5))
            plt.plot(df['horario'], df['temperatura'], marker='o', linestyle='-', color='b')
            plt.xlabel("Horário")
            plt.ylabel("Temperatura")
            plt.title("Variação da Temperatura")
            plt.xticks(rotation=45)
            plt.grid()
            
            plt.savefig("static/grafico.png")
            plt.close()
            print(f"Gráfico atualizado às {datetime.now().strftime('%H:%M')}.")
        
        cursor.close()
        conexao.close()
    except Exception as e:
        print(f"Erro ao gerar gráfico: {e}")

if __name__ == "__main__":
    while True:
        gerar_grafico()
        time.sleep(5)