import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

// Inicializa Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Inicializa el servicio de almacenamiento (Storage)
const storage = getStorage(firebaseApp);

// Función para subir imagen
const uploadImage = async (image) => {
    const storageRef = ref(storage, `images/${image.name}`);

    const metadata = {
        contentType: image.type
    };

    try {
        const fileData = await uploadBytesResumable(storageRef, image, metadata);
        const downloadURL = await getDownloadURL(fileData.ref);
        console.log("File available at", downloadURL);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
};

// Función para registrar un usuario
const registerUser = async (user, actions, toast, navigate) => {
    if (user.password !== user.passwordConfirm) {
        toast.error("Passwords do not match");
        return;
    }

    const profileImageUrl = await uploadImage(user.image);
    await actions.register(user.email, user.fullName, user.password, profileImageUrl);
    navigate("/");
};

// Exportar las funciones e instancias necesarias
export { storage, uploadImage, registerUser };
