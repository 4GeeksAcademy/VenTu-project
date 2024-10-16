from flask import Blueprint, jsonify, request
from api.models import db, TourPlan, Client, Provider, User, Reservation
from werkzeug.security import generate_password_hash
from datetime import datetime

api = Blueprint('api', __name__)

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
    
    new_user.save()  # Usamos el método save para crear el Provider
    return jsonify({"message": "Provider registered", "id": new_user.id}), 201

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
    
    new_user.save()  # Usamos el método save para crear el Client
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
    if not data.get('title') or not data.get('price'):
        return jsonify({"error": "Missing title or price"}), 400
    
    new_plan = TourPlan(
        title=data.get('title'),
        description=data.get('description'),
        price=data.get('price'),
        available_spots=data.get('available_spots'),
        start_date=data.get('start_date'),
        end_date=data.get('end_date'),
        provider_id=data.get('provider_id')
    )
    db.session.add(new_plan)
    db.session.commit()
    return jsonify({"message": "Tour plan created", "id": new_plan.id}), 201

@api.route('/tourplans/<int:plan_id>', methods=['PUT'])
def update_tour_plan(plan_id):
    data = request.json
    plan = TourPlan.query.get(plan_id)
    if not plan:
        return jsonify({"error": "Tour plan not found"}), 404
    
    plan.title = data.get('title', plan.title)
    plan.description = data.get('description', plan.description)
    plan.price = data.get('price', plan.price)
    plan.available_spots = data.get('available_spots', plan.available_spots)
    plan.start_date = data.get('start_date', plan.start_date)
    plan.end_date = data.get('end_date', plan.end_date)
    db.session.commit()
    return jsonify({"message": "Tour plan updated"}), 200

@api.route('/tourplans/<int:plan_id>', methods=['DELETE'])
def delete_tour_plan(plan_id):
    plan = TourPlan.query.get(plan_id)
    if not plan:
        return jsonify({"error": "Tour plan not found"}), 404
    
    db.session.delete(plan)
    db.session.commit()
    return jsonify({"message": "Tour plan deleted"}), 200

# ========================
# Rutas para Providers
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
# Rutas para Clients
# ========================

@api.route('/clients', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    result = [{"id": client.id,
                "user_id": client.user_id,
                "status": client.status,
                "username": client.username,
                "email":client.email,                
                "role":client.role
                } for client in clients]
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
    
    return jsonify({"message": "Client deleted and user marked as inactive!"}), 200

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


# ========================
# Rutas para Reservations
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
    new_reservation = Reservation(
        reservation_date=datetime.utcnow(),
        status=data.get('status'),
        client_id=data.get('client_id'),
        tour_plan_id=data.get('tour_plan_id')
    )
    db.session.add(new_reservation)
    db.session.commit()
    return jsonify({"message": "Reservation created", "id": new_reservation.id}), 201

@api.route('/reservations/<int:reservation_id>', methods=['DELETE'])
def delete_reservation(reservation_id):
    reservation = Reservation.query.get(reservation_id)
    if not reservation:
        return jsonify({"error": "Reservation not found"}), 404
    
    db.session.delete(reservation)
    db.session.commit()
    return jsonify({"message": "Reservation deleted"}), 200

