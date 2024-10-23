from flask import Flask
from flask.cli import AppGroup
from api.models import db, User, Client, Provider, TourPlan, Reservation
from werkzeug.security import generate_password_hash

def setup_commands(app):
    # Crear un AppGroup personalizado llamado 'custom'
    custom_commands = AppGroup('custom')

    # Comando para insertar datos de prueba
    @custom_commands.command('insert-test-data')
    def insert_test_data():
        """
        Inserta datos de prueba en las tablas User, Client, Provider y otras
        """
        # Crear usuarios de prueba
        user1 = User(username="client1", email="client1@example.com", password_hash=generate_password_hash("password123"), role="client")
        user2 = User(username="provider1", email="provider1@example.com", password_hash=generate_password_hash("password123"), role="provider")
        
        # Crear clientes y proveedores asociados a los usuarios
        client1 = Client(user=user1, status="active")
        provider1 = Provider(user=user2)
        
        # Insertar en la base de datos
        db.session.add_all([user1, user2, client1, provider1])
        db.session.commit()

        print("Datos de prueba insertados con éxito")

    # Comando para listar todos los usuarios
    @custom_commands.command('list-users')
    def list_users():
        """
        Lista todos los usuarios en la base de datos
        """
        users = User.query.all()
        if not users:
            print("No hay usuarios en la base de datos.")
            return

        for user in users:
            print(f"ID: {user.id}, Username: {user.username}, Email: {user.email}, Role: {user.role}")

    # Comando para eliminar todos los datos de prueba
    @custom_commands.command('delete-all-data')
    def delete_all_data():
        """
        Elimina todos los datos de las tablas User, Client, Provider, TourPlan, Reservation
        """
        db.session.query(Reservation).delete()
        db.session.query(TourPlan).delete()
        db.session.query(Client).delete()
        db.session.query(Provider).delete()
        db.session.query(User).delete()
        db.session.commit()

        print("Todos los datos han sido eliminados")

    # Registrar los comandos en la aplicación Flask
    app.cli.add_command(custom_commands)

