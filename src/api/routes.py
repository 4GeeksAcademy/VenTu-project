from flask import Blueprint, jsonify, request
from api.models import db, TourPlan, Client, Provider, User, Reservation
from datetime import datetime
import os
from api.firebase import storage

api = Blueprint('api', __name__)

# ========================
# Rutas de Registro de Usuarios
# ========================

@api.route('/register/provider', methods=['POST'])
def register_provider():
    data = request.json
    if not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing username, email or password"}), 400

    # Crear el usuario con rol provider
    new_user = User(
        username=data.get('username'),
        email=data.get('email'),
        password_hash=generate_password_hash(data.get('password')),
        role='provider'
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    # Crear un proveedor asociado al nuevo usuario
    new_provider = Provider(user_id=new_user.id)
    db.session.add(new_provider)
    db.session.commit()
    
    return jsonify({"message": "Provider registered", "id": new_user.id}), 201

@api.route('/register/client', methods=['POST'])
def register_client():
    data = request.json
    if not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing username, email or password"}), 400

    # Crear el usuario con rol client
    new_user = User(
        username=data.get('username'),
        email=data.get('email'),
        password_hash=generate_password_hash(data.get('password')),
        role='client'
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    # Crear un cliente asociado al nuevo usuario
    new_client = Client(user_id=new_user.id, status='active')
    db.session.add(new_client)
    db.session.commit()

    return jsonify({"message": "Client registered", "id": new_user.id}), 201

# ========================
# Rutas para Tour Plans
# ========================

@api.route('/tourplans', methods=['GET'])
def get_tour_plans():
    tour_plans = TourPlan.query.all()
    result = [
        {
            "id": plan.id,
            "title": plan.title,
            "description": plan.description,
            "price": plan.price,
            "available_spots": plan.available_spots,
            "start_date": plan.start_date,
            "end_date": plan.end_date,
            "provider_id": plan.provider_id,
            "created_at": plan.created_at
        } for plan in tour_plans
    ]
    return jsonify(result), 200

@api.route('/tourplans', methods=['POST'])
def create_tour_plan():
    data = request.json
    
    # Validar que el usuario sea un proveedor
    provider = Provider.query.filter_by(user_id=data.get('user_id')).first()
    if not provider:
        return jsonify({"error": "El usuario no es un proveedor válido"}), 403

    # Validar campos requeridos
    if not data.get('title') or not data.get('price'):
        return jsonify({"error": "Faltan campos obligatorios"}), 400
    
    # Crear el nuevo TourPlan
    new_plan = TourPlan(
        title=data.get('title'),
        description=data.get('description'),
        price=data.get('price'),
        available_spots=data.get('available_spots'),
        start_date=data.get('start_date'),
        end_date=data.get('end_date'),
        provider_id=provider.id
    )
    db.session.add(new_plan)
    db.session.commit()
    return jsonify({"message": "Tour plan created", "id": new_plan.id}), 201

# ========================
# Rutas para subir imágenes a Firebase
# ========================

@api.route('/upload_image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file:
        filename = secure_filename(file.filename)
        filepath = f"images/{filename}"
        storage.child(filepath).put(file)  # Subir imagen a Firebase Storage
        
        # Obtener URL de la imagen
        image_url = storage.child(filepath).get_url(None)
        
        return jsonify({"message": "Image uploaded", "url": image_url}), 201

# ========================
# Rutas para Proveedores
# ========================

@api.route('/providers', methods=['GET'])
def get_providers():
    providers = Provider.query.all()
    result = [{"id": provider.id, "user_id": provider.user_id} for provider in providers]
    return jsonify(result), 200

@api.route('/providers/<int:provider_id>', methods=['DELETE'])
def delete_provider(provider_id):
    provider = Provider.query.get(provider_id)
    if not provider:
        return jsonify({"error": "Provider not found"}), 404
    
    db.session.delete(provider)
    db.session.commit()
    return jsonify({"message": "Provider deleted"}), 200

# ========================
# Rutas para Clientes
# ========================

@api.route('/clients', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    result = [{"id": client.id,
                "user_id": client.user_id,
                "status": client.status,
                "username": client.username,
                "email":client.email,
                "password":client.password_hash,
                "role":client.role
                } for client in clients]
    return jsonify(result), 200

@api.route('/clients/<int:client_id>', methods=['DELETE'])
def delete_client(client_id):
    client = Client.query.get(client_id)
    if not client:
        return jsonify({"error": "Client not found"}), 404
    
    db.session.delete(client)
    db.session.commit()
    return jsonify({"message": "Client deleted"}), 200

# ========================
# Rutas para Users
# ========================

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    result = [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "created_at": user.created_at
        } for user in users
    ]
    return jsonify(result), 200

@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200

# ========================
# Rutas para Reservaciones
# ========================

@api.route('/reservations', methods=['GET'])
def get_reservations():
    reservations = Reservation.query.all()
    result = [
        {
            "id": reservation.id,
            "reservation_date": reservation.reservation_date,
            "status": reservation.status,
            "client_id": reservation.client_id,
            "tour_plan_id": reservation.tour_plan_id
        } for reservation in reservations
    ]
    return jsonify(result), 200

@api.route('/reservations', methods=['POST'])
def create_reservation():
    data = request.json

    # Validar que el cliente existe
    client = Client.query.filter_by(user_id=data.get('client_id')).first()
    if not client:
        return jsonify({"error": "El cliente no es válido"}), 403

    # Validar que hay cupos disponibles en el TourPlan
    tour_plan = TourPlan.query.get(data.get('tour_plan_id'))
    if tour_plan.available_spots <= 0:
        return jsonify({"error": "No hay cupos disponibles"}), 400

    # Crear la reservación
    new_reservation = Reservation(
        reservation_date=datetime.utcnow(),
        status=data.get('status'),
        client_id=client.id,
        tour_plan_id=tour_plan.id
    )
    
    # Reducir los cupos disponibles del tour
    tour_plan.available_spots -= 1
    db.session.add(new_reservation)
    db.session.commit()

    return jsonify({"message": "Reservación creada exitosamente", "id": new_reservation.id}), 201

@api.route('/reservations/<int:reservation_id>', methods=['DELETE'])
def delete_reservation(reservation_id):
    reservation = Reservation.query.get(reservation_id)
    if not reservation:
        return jsonify({"error": "Reservation not found"}), 404
    
    db.session.delete(reservation)
    db.session.commit()
    return jsonify({"message": "Reservation deleted"}), 200
