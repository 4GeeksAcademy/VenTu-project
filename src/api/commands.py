from flask import Flask
from flask.cli import AppGroup
from api.models import db, User, Client, Provider

def setup_commands(app):
    # Este grupo de comandos puede ejecutarse con `flask custom insert-test-data`
    custom_commands = AppGroup('custom')

    @custom_commands.command('insert-test-data')
    def insert_test_data():
        # Crear datos de prueba
        user1 = User(username="testuser1", email="test1@example.com", password_hash="hash", role="client")
        user2 = User(username="testuser2", email="test2@example.com", password_hash="hash", role="provider")
        
        client1 = Client(user=user1, status="active")
        provider1 = Provider(user=user2)
        
        db.session.add_all([user1, user2, client1, provider1])
        db.session.commit()
        print("Test data inserted successfully!")

    # Registrar el comando con la aplicación Flask
    app.cli.add_command(custom_commands)
