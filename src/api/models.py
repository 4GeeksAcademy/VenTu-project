from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.orm import validates
from enum import Enum
from sqlalchemy import Enum as SQLAlchemyEnum
from datetime import datetime, timezone

db = SQLAlchemy()
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)  # "provider" or "client"
    status = db.Column(db.String(50), default="active", nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    @validates('role')
    def validate_role(self, key, value):
        allowed_roles = ['provider', 'client']
        if value not in allowed_roles:
            raise ValueError(f"Invalid role '{value}', allowed roles are: {allowed_roles}")
        return value
    def save(self):
        db.session.add(self)
        db.session.commit()
        # Crear un registro asociado en Provider o Client según el rol del usuario
        if self.role == 'provider':
            provider = Provider(user_id=self.id)
            db.session.add(provider)
        elif self.role == 'client':
            client = Client(user_id=self.id, username=self.username, email=self.email, role=self.role, status="active")
            db.session.add(client)
        db.session.commit()

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": self.role,
            "status": self.status,
            "created_at": self.created_at.isoformat()  # Convierte a formato ISO para JSON
        }   

class Client(db.Model):
    __tablename__ = 'client'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    role = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user = db.relationship('User', backref='client')
    
class Provider(db.Model):
    __tablename__ = 'provider'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user = db.relationship('User', backref='provider')


class TourPlan(db.Model):
    __tablename__ = 'tour_plan'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    available_spots = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey('provider.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)  # Almacena la URL de la imagen
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    provider = db.relationship('Provider', backref='tour_plan')

    def __repr__(self):
        return f'<TourPlan {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "available_spots": self.available_spots,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "provider_id": self.provider_id,
            "image_url": self.image_url,
            "created_at": self.created_at
        }
class ReservationStatus(Enum):
    ACTIVE = 'active'
    CANCELLED = 'cancelled'
    COMPLETED = 'completed'
class Reservation(db.Model):
    __tablename__ = 'reservation'
    
    id = db.Column(db.Integer, primary_key=True)
    reservation_date = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.now(timezone.utc))
    status = db.Column(SQLAlchemyEnum(ReservationStatus), nullable=False, default=ReservationStatus.ACTIVE)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    tour_plan_id = db.Column(db.Integer, db.ForeignKey('tour_plan.id'), nullable=False)
    
    # Relaciones
    client = db.relationship('Client', backref='reservations')
    tour_plan = db.relationship('TourPlan', backref='reservations')
    
    def serialize(self):
        return {
            'id': self.id,
            'reservation_date': self.reservation_date.isoformat(),
            'status': self.status.value,
            'client_id': self.client_id,
            'tour_plan_id': self.tour_plan_id
        }
