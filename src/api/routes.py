from flask import Blueprint, jsonify, Blueprint, jsonify, request, app
from api.models import db, TourPlan, Client, Provider, User, Reservation
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from datetime import datetime
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import os
import cloudinary
import cloudinary.uploader
from datetime import datetime, timezone
from api.models import ReservationStatus


api = Blueprint('api', __name__)



cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

@api.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['image']
    result = cloudinary.uploader.upload(file)
    print(result["secure_url"])
    return jsonify({"url": result["secure_url"]})



# =====================================
# Rutas de autenticación con JWT
# =====================================

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Correo electrónico o contraseña incorrectos"}), 401
    if not check_password_hash(user.password_hash, password):
        return jsonify({"msg": "Correo electrónico o contraseña incorrectos"}), 401


    access_token = create_access_token(identity=email)
    return jsonify(token=access_token, user=user.serialize()), 200


@api.route('/me', methods=['GET'])
@jwt_required()
def get_me():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.serialize()), 200



# =====================================
# Rutas para Providers
# =====================================

@api.route('/register/provider', methods=['POST'])
def register_provider():
    data = request.json
    if not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing username, email or password"}), 400

    new_user = User(
        username=data.get('username'),
        email=data.get('email'),
        password_hash=generate_password_hash(data.get('password')),
        role='provider'
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    new_provider = Provider(user_id=new_user.id)
    db.session.add(new_provider)
    db.session.commit()
    
    return jsonify({"message": "Provider registered", "id": new_user.id}), 201

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


# =====================================
# Rutas para Clients
# =====================================

@api.route('/register/client', methods=['POST'])
def register_client():
    data = request.json
    if not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing username, email or password"}), 400

    new_user = User(
        username=data.get('username'),
        email=data.get('email'),
        password_hash=generate_password_hash(data.get('password')),
        role='client'
    )
    
    new_user.save()  # Se utiliza el método save para manejar la creación
    return jsonify({"message": "Client registered", "id": new_user.id}), 201

@api.route('/clients', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    result = [{"id": client.id, "user_id": client.user_id, "status": client.status} for client in clients]
    return jsonify(result), 200

@api.route('/clients/<int:client_id>', methods=['DELETE'])
def delete_client(client_id):
    client = Client.query.get(client_id)
    if not client:
        return jsonify({"error": "Client not found"}), 404
    
    user = User.query.get(client.user_id)
    if user:
        user.status = "inactive"
        db.session.commit()

    db.session.delete(client)
    db.session.commit()
    return jsonify({"message": "Client deleted and user marked as inactive"}), 200


# =====================================
# Rutas para Users
# =====================================

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    result = [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "status": user.status,
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


# =====================================
# Rutas para Tour Plans
# =====================================

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
@jwt_required()
def create_tour_plan():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    
    if not user or user.role != 'provider':
        return jsonify({"msg": "El usuario no es un proveedor válido"}), 403
    
    if not user.provider:
        return jsonify({"msg": "No se encontró un proveedor asociado a este usuario"}), 404

    data = request.form
    new_plan = TourPlan(
        title=data.get('title'),
        description=data.get('description'),
        price=data.get('price'),
        provider_id=user.provider.id
    )

    db.session.add(new_plan)
    db.session.commit()
    return jsonify({"message": "Tour plan created"}), 201


# =====================================
# Rutas para Reservaciones
# =====================================

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

    # Validar que el TourPlan existe y que hay cupos disponibles
    tour_plan = TourPlan.query.get(data.get('tour_plan_id'))
    if not tour_plan:
        return jsonify({"error": "El TourPlan no existe"}), 404

    if tour_plan.available_spots <= 0:
        return jsonify({"error": "No hay cupos disponibles"}), 400

    # Obtener el estado de la reserva, usar 'active' si no se proporciona o si es inválido
    status_str = data.get('status', 'active').lower()
    if status_str not in ReservationStatus._value2member_map_:
        status = ReservationStatus.ACTIVE
    else:
        status = ReservationStatus(status_str)

    # Crear la reservación con fecha y hora en UTC
    new_reservation = Reservation(
        reservation_date=datetime.now(timezone.utc),
        status=status,
        client_id=client.id,
        tour_plan_id=tour_plan.id
    )
    
    # Reducir los cupos disponibles del tour
    tour_plan.available_spots -= 1

    # Guardar la reservación y el nuevo valor de available_spots en la base de datos
    db.session.add(new_reservation)
    db.session.commit()

    # Devolver la información de la reservación y los cupos disponibles restantes
    return jsonify({
        "message": "Reservación creada exitosamente",
        "reservation_id": new_reservation.id,
        "available_spots_remaining": tour_plan.available_spots
    }), 201


@api.route('/reservations/<int:reservation_id>', methods=['DELETE'])
def delete_reservation(reservation_id):
    reservation = Reservation.query.get(reservation_id)
    if not reservation:
        return jsonify({"error": "Reservation not found"}), 404
    
    db.session.delete(reservation)
    db.session.commit()
    return jsonify({"message": "Reservation deleted"}), 200


@api.route('/api/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"msg": "No file part"}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({"msg": "No selected file"}), 400
    
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)  # Use app
        file.save(filepath)
        
        # Guardar información de la imagen en un nuevo TourPlan o actualizar uno existente
        image_url = f'/uploads/{filename}'
        # Aquí puedes relacionar el tour con la imagen cargada (ej. buscando el tour por ID)
        
        return jsonify({"msg": "File uploaded", "filename": filename, "url": image_url}), 201