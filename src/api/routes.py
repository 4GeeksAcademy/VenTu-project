from flask import Blueprint, jsonify, request
from flask_cors import CORS
from api.models import db, TourPlan, Client, Provider, User, Reservation
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from api.firebase import storage
from werkzeug.utils import secure_filename

api = Blueprint('api', __name__)

# ========================
# Rutas de login 
# ========================
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    # Buscar usuario por email
    user = User.query.filter_by(email=email).first()

    # Validar contraseña
    if user is None or not check_password_hash(user.password_hash, password):
        return jsonify({"msg": "Invalid email or password"}), 401

    # Crear JWT token
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200


# ========================
# Rutas de Registro de Providers 
# ========================
@api.route('/register/provider', methods=['POST'])
def register_provider():
    data = request.json

    # Validar que los campos requeridos están presentes
    if not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing username, email or password"}), 400

    # Verificar si el email ya está registrado
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({"error": "Email already exists"}), 400

    # Crear nuevo usuario con rol de proveedor (provider)
    new_user = User(
        username=data.get('username'),
        email=data.get('email'),
        password_hash=generate_password_hash(data.get('password')),
        role='provider'
    )

    db.session.add(new_user)
    db.session.commit()

    # Crear un proveedor asociado al usuario
    new_provider = Provider(user_id=new_user.id)
    db.session.add(new_provider)
    db.session.commit()

    return jsonify({"message": "Provider registered successfully", "id": new_user.id}), 201


# ========================
# Rutas de Registro de Clientes
# ========================
@api.route('/register/client', methods=['POST'])
def register_client():
    data = request.json

    # Validar que los campos requeridos están presentes
    if not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing username, email or password"}), 400

    # Verificar si el email ya está registrado
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({"error": "Email already exists"}), 400

    # Crear nuevo usuario con rol de cliente (client)
    new_user = User(
        username=data.get('username'),
        email=data.get('email'),
        password_hash=generate_password_hash(data.get('password')),
        role='client'
    )

    db.session.add(new_user)
    db.session.commit()

    # Asociar el cliente al usuario recién creado
    new_client = Client(user_id=new_user.id, status='active')
    db.session.add(new_client)
    db.session.commit()

    return jsonify({"message": "Client registered successfully", "id": new_user.id}), 201


# ========================
# Rutas para Tour Plans (Requiere autenticación)
# ========================
@api.route('/tourplans', methods=['POST'])
@jwt_required()  # Solo usuarios autenticados pueden crear tour plans
def create_tourplan():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Solo los proveedores pueden crear un tour plan
    if current_user.role != 'provider':
        return jsonify({"msg": "You are not authorized to create tour plans"}), 403

    data = request.get_json()

    # Validar campos requeridos
    if not data.get('title') or not data.get('price') or not data.get('available_spots'):
        return jsonify({"error": "Missing title, price, or available spots"}), 400

    # Crear nuevo tour plan
    new_plan = TourPlan(
        title=data.get('title'),
        description=data.get('description'),
        price=data.get('price'),
        available_spots=data.get('available_spots'),
        start_date=data.get('start_date'),
        end_date=data.get('end_date'),
        provider_id=current_user.id  # Se asocia al provider autenticado
    )

    db.session.add(new_plan)
    db.session.commit()

    return jsonify({"msg": "Tourplan created successfully", "id": new_plan.id}), 201


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


# ========================
# Rutas para subir imágenes
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
# Rutas para Proveedores (Requiere autenticación)
# ========================
@api.route('/providers', methods=['GET'])
def get_providers():
    providers = Provider.query.all()
    result = [{"id": provider.id, "user_id": provider.user_id} for provider in providers]
    return jsonify(result), 200


@api.route('/providers/<int:provider_id>', methods=['DELETE'])
@jwt_required()
def delete_provider(provider_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if current_user.role != 'provider':
        return jsonify({"error": "You are not authorized to delete providers"}), 403

    provider = Provider.query.get(provider_id)
    if not provider:
        return jsonify({"error": "Provider not found"}), 404
    
    db.session.delete(provider)
    db.session.commit()
    return jsonify({"message": "Provider deleted"}), 200


# ========================
# Rutas para Clientes (Requiere autenticación)
# ========================
@api.route('/clients', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    result = [{"id": client.id, "user_id": client.user_id, "status": client.status} for client in clients]
    return jsonify(result), 200


@api.route('/clients/<int:client_id>', methods=['DELETE'])
@jwt_required()
def delete_client(client_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Solo un administrador puede eliminar clientes
    if current_user.role != 'admin':  
        return jsonify({"error": "You are not authorized to delete clients"}), 403

    client = Client.query.get(client_id)
    if not client:
        return jsonify({"error": "Client not found"}), 404
    
    db.session.delete(client)
    db.session.commit()
    return jsonify({"message": "Client deleted"}), 200


# ========================
# Rutas para Reservaciones (Requiere autenticación)
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
@jwt_required()
def create_reservation():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Validar que el cliente exista
    client = Client.query.filter_by(user_id=current_user.id).first()
    if not client:
        return jsonify({"error": "Client not authorized to create reservations"}), 403

    data = request.json

    # Validar que haya cupos disponibles en el TourPlan
    tour_plan = TourPlan.query.get(data.get('tour_plan_id'))
    if not tour_plan or tour_plan.available_spots <= 0:
        return jsonify({"error": "No available spots or invalid tour plan"}), 400

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

    return jsonify({"message": "Reservation created successfully", "id": new_reservation.id}), 201


@api.route('/reservations/<int:reservation_id>', methods=['DELETE'])
@jwt_required()
def delete_reservation(reservation_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    reservation = Reservation.query.get(reservation_id)
    if not reservation:
        return jsonify({"error": "Reservation not found"}), 404
    
    db.session.delete(reservation)
    db.session.commit()
    return jsonify({"message": "Reservation deleted"}), 200
