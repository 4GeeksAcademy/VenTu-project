import firebase_admin
from firebase_admin import credentials, storage
import os

# credenciales de Firebase
cred = credentials.Certificate(os.getenv("GOOGLE_APPLICATION_CREDENTIALS"))  # Ruta JSON de credenciales
firebase_admin.initialize_app(cred, {
    'storageBucket': os.getenv("STORAGE_BUCKET")
})


bucket = storage.bucket()

def upload_image(file_path, file_name):
    blob = bucket.blob(file_name)
    blob.upload_from_filename(file_path)
    blob.make_public()
    return blob.public_url