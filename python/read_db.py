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
        
        #Exemplos de busca personalizada
        '''
        #cursor.execute("SELECT horario, temperatura FROM temp WHERE horario BETWEEN '2025-02-15 20:00:00' AND '2025-02-15 20:10:00'")
        
        data_inicio = "2025-02-15 12:00:00"
        data_fim = "2025-02-15 18:00:00"
        cursor.execute("SELECT horario, temperatura FROM temp WHERE horario BETWEEN %s AND %s", (data_inicio, data_fim))
        '''
        
        dados = cursor.fetchall()
        
        if dados:
            df = pd.DataFrame(dados, columns=['horario', 'temperatura'])
            df['horario'] = pd.to_datetime(df['horario'])
            df.sort_values(by='horario', inplace=True)
            
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
        time.sleep(60)