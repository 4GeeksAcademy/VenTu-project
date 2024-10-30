import toast from "react-hot-toast";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            user: null,
            token: localStorage.getItem("token") || null,
            tourPlans: [],
            favorites: [],
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ]
        },
        actions: {

            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            uploadImage: async (image) => {
                const formData = new FormData();
                formData.append("image", image);
                const resp = await fetch(`${process.env.BACKEND_URL}/api/upload`, {
                    method: "POST",
                    body: formData
                });
                const data = await resp.json();
                console.log(data);
                if (resp.ok) {
                    return data.url;
                }
            },
            // Función para obtener los tour plans
            getTourPlans: async () => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/tourplans`, {
                        headers: {
                            Authorization: `Bearer ${getStore().token}`
                        }
                    });

                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({ tourPlans: data });
                    } else {
                        toast.error("Error al obtener los Tour Plans.");
                    }
                } catch (error) {
                    console.error("Error fetching tour plans:", error);
                    toast.error("Hubo un problema obteniendo los Tour Plans.");
                }
            },

            // Función para subir imagen
            uploadImage: async (image) => {
                try {
                    const formData = new FormData();
                    formData.append("image", image);

                    const resp = await fetch(`${process.env.BACKEND_URL}/api/upload`, {
                        method: "POST",
                        body: formData
                    });

                    const data = await resp.json();

                    if (resp.ok && data.url) {
                        return data.url;
                    } else {
                        throw new Error("Error subiendo la imagen");
                    }
                } catch (error) {
                    console.error("Error subiendo la imagen:", error);
                    toast.error("Error al subir la imagen.");
                    return null; // Retorna null en caso de error para manejarlo después
                }
            },

            getClient: async () => {
                const { register } = getActions();
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/clients`);
                    if (response.status === 404) {
                        register();
                    } else {
                        const data = await response.json();
                        setStore({ user: data.user });
                    }
                } catch (error) {
                    console.error('Error al obtener los clientes:', error);
                }
            },


            register: async (email, fullName, password, role) => {
                const resp = await fetch(`${process.env.BACKEND_URL}/api/register/${role}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        username: fullName,
                        password: password,
                    })
                });

                if (resp.ok) {
                    toast.success("Usuario registrado! Bienvenido!");
                } else {
                    toast.error("Error registrando al usuario!");
                }
            },

            deleteClient: async (clientId) => {
                const resp = await fetch(`${process.env.BACKEND_URL}/api/clients/${clientId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (resp.ok) {
                    toast.success("Client deleted successfully!");
                    await getActions().getClient();
                } else {
                    toast.error("Error deleting client");
                }
            },

            login: async (email, password) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/token`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    });

                    const data = await resp.json();
                    if (resp.ok) {
                        localStorage.setItem("token", data.token);
                        setStore({
                            token: data.token,
                            user: data.user
                        });
                        toast.success("Logged in! 🎉");
                    } else {
                        toast.error(data.msg || "Error logging in!");
                    }
                } catch (error) {
                    console.error("Login error:", error);
                    toast.error("Check your network connection.");
                }
            },

            logout: () => {
                localStorage.removeItem("token");
                setStore({ token: null });
                setStore({ user: null });
                toast.success("Desconectado! 🎉");
            },

            me: async () => {
                const resp = await fetch(`${process.env.BACKEND_URL}/api/me`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });

                const data = await resp.json();
                if (resp.ok) {
                    setStore({ user: data });
                } else {
                    console.log("Error getting user data");
                }
            },

            // Función para crear tour plan
            createTourPlan: async (formData) => {
                try {
                    const token = localStorage.getItem("token");
                    if (!token) {
                        toast.error("No token found, please log in first");
                        return;
                    }

                    const BACKEND_URL = process.env.BACKEND_URL.endsWith('/') ? process.env.BACKEND_URL.slice(0, -1) : process.env.BACKEND_URL;

                    const response = await fetch(`${BACKEND_URL}/api/tourplans`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        body: formData
                    });

                    const data = await response.json();

                    if (response.ok) {
                        toast.success("Tour plan creado con éxito! 🎉");
                        return data;
                    } else {
                        console.error("Error creando el Tour Plan:", data); // Aquí se muestra más información del error
                        toast.error(data.msg || "Error creando el Tour Plan");
                    }
                } catch (error) {
                    console.error("Error creando el Tour Plan:", error); // Aquí se captura el error del catch
                    toast.error("Ocurrió un problema al crear el Tour Plan.");
                }
            },

            // Función para agregar favoritos
            addFavorite: async (tourPlanId) => {
                const store = getStore();
                try {
                    const token = localStorage.getItem("token");
                    if (!token) {
                        toast.error("No token found, please log in first");
                        return;
                    }
                    
                    
                    
                    

                    if (!store.favorites.some(fav => fav.id === tourPlanId)) {
                        const response = await fetch(`${process.env.BACKEND_URL}/api/favorite/client/tourplan/${tourPlanId}`, {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });

                        if (response.ok) {
                            const data = await response.json();
                            const newFavorites = [...store.favorites, data];
    
                            console.log(tourPlanId);
                            setStore({ favorites: newFavorites });
                            
                            toast.success("Agregado a favoritos! 🎉");
                            
                            console.log(data);
                        }

                    } else {
                        toast.error("Ya está en favoritos!");
                    }

                } catch (error) {
                    console.error("Error adding favorite:", error);
                    toast.error("Error adding favorite");
                }
            },

            // Función para quitar favoritos
            removeFavorite: async (tourPlanId) => {
                try {
                    const store = getStore();
                    const newFavorites = store.favorites.filter(fav => fav.id !== tourPlanId);
                    setStore({ favorites: newFavorites });
                    localStorage.setItem("favorites", JSON.stringify(newFavorites));
                    toast.success("Quitado de favoritos! 🎉");
                } catch (error) {
                    console.error("Error removing favorite:", error);
                    toast.error("Error removing favorite");
                }
            },

            getFavorites: async () => {
                try {
                    const token = localStorage.getItem("token");
                    if (!token) {
                        toast.error("No token found, please log in first");
                        return;
                    }

                    const response = await fetch(`${process.env.BACKEND_URL}/api/favorites/client`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setStore({ favorites: data });
                    } else {
                        toast.error("Error getting favorites");
                    }
                } catch (error) {
                    console.error("Error getting favorites:", error);
                    toast.error("Error getting favorites");
                }
            },




            changeColor: (index, color) => {
                const store = getStore();

                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                setStore({ demo: demo });
            }
        }
    };
};

export default getState;
