import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask import redirect, url_for, request
from .models import db, User, TourPlan, Provider, Client, Reservation

class CustomModelView(ModelView):
    column_filters = ['username', 'role']
    
    def is_accessible(self):
        # Aquí puedes agregar lógica para permitir solo a ciertos usuarios acceder
        return True  # Temporalmente, permitimos el acceso a todos

    def on_model_change(self, form, model, is_created):
        if model.role not in ['provider', 'client']:
            raise ValueError("Role must be 'provider' or 'client'.")

        if is_created:
            model.save()

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Añadir vistas de los modelos al panel de administración
    admin.add_view(CustomModelView(User, db.session))
    admin.add_view(ModelView(TourPlan, db.session))
    admin.add_view(ModelView(Provider, db.session))
    admin.add_view(ModelView(Client, db.session))
    admin.add_view(ModelView(Reservation, db.session))