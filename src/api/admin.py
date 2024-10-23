import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, User, TourPlan, Provider, Client, Reservation

# Modelo personalizado para manejar campos y permisos de usuarios
class CustomModelView(ModelView):
    column_filters = ['username', 'role']
    
    def is_accessible(self):
        # Aquí puedes agregar lógica para permitir acceso solo a ciertos usuarios
        return True

    def on_model_change(self, form, model, is_created):
        if model.role not in ['provider', 'client']:
            raise ValueError("Role must be 'provider' or 'client'.")

        if is_created:
            model.save()


# Modelo personalizado para TourPlan, permite seleccionar Provider
class TourPlanAdmin(ModelView):
    form_columns = ['title', 'description', 'price', 'available_spots', 'start_date', 'end_date', 'provider']

    def on_model_change(self, form, model, is_created):
        # Validar que el tour plan tenga un provider asociado
        if not model.provider:
            raise ValueError("El TourPlan debe tener un proveedor asociado.")
        return super().on_model_change(form, model, is_created)


# Modelo personalizado para Reservation, permite seleccionar Client y TourPlan
class ReservationAdmin(ModelView):
    form_columns = ['reservation_date', 'status', 'client', 'tour_plan']

    def on_model_change(self, form, model, is_created):
        # Validar que la reservación tenga un cliente y un tour plan válidos
        if not model.client:
            raise ValueError("La reservación debe estar asociada a un cliente.")
        if not model.tour_plan:
            raise ValueError("La reservación debe estar asociada a un TourPlan.")
        return super().on_model_change(form, model, is_created)


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Añadir vistas de los modelos al panel de administración
    admin.add_view(CustomModelView(User, db.session))
    admin.add_view(TourPlanAdmin(TourPlan, db.session))
    admin.add_view(ModelView(Provider, db.session))
    admin.add_view(ModelView(Client, db.session))
    admin.add_view(ReservationAdmin(Reservation, db.session))