import mysql.connector
import time
import random

config = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "cerveja_db"
}

def inserir_dados():
    try:
        conexao = mysql.connector.connect(**config)
        cursor = conexao.cursor()
        
        while True:
            temperatura = round(random.uniform(0, 100), 2)
            query = "INSERT INTO temp (temperatura, horario) VALUES (%s, NOW())"
            valores = (temperatura,)
            cursor.execute(query, valores)
            conexao.commit()
            print(f"Inserido: Temperatura {temperatura}°C")
            time.sleep(5)
    
    except mysql.connector.Error as err:
        print(f"Erro: {err}")
    
    finally:
        cursor.close()
        conexao.close()

if __name__ == "__main__":
    inserir_dados()