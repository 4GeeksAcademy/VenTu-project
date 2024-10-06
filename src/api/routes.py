from flask import Flask, jsonify, request
from .models import db, User, Client, Provider, TourPlan, Reservation

# Ruta de prueba para listar usuarios
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.username for user in users])

# Ruta para agregar un nuevo cliente
@app.route("/clients", methods=["POST"])
def add_client():
    data = request.get_json()
    user_id = data.get('user_id')
    status = data.get('status')
    
    new_client = Client(user_id=user_id, status=status)
    db.session.add(new_client)
    db.session.commit()

    return jsonify({"message": "Client added successfully"}), 201
