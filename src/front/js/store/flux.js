import toast from "react-hot-toast";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: null,
			token: localStorage.getItem("token") || null,
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
			},

			getClient: async () => {

				const { register } = getActions();

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/clients`);
					

					if (response.status === 404) {
						register();
					} else {
						const data = await response.json();
						console.log(data);
						setStore({ user: data.user }); 
					}
				} catch (error) {
					console.error('Error al obtener los clientes:', error);
				}
			},


			register: async (email, fullName, password) => {
				const { getClient } = getActions();
				const resp = await fetch(process.env.BACKEND_URL + "/api/register/client", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						username: fullName,
						password: password
					})
				});
				const data = await resp.json();

				localStorage.setItem("token", data.token);

				setStore({ user: data.user });
				setStore({ token: data.token });

				if (resp.ok) {
					getClient();
					toast.success("User registered!");
				}
				else {
					toast.error("Error registering user");
				}
			},

			deleteClient: async (clientId) => {
				const resp = await fetch(`${process.env.BACKEND_URL}/api/clients/${clientId}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",

					}
				});

				if (resp.ok) {
					toast.success("Client deleted successfully!");
					await getActions().getClient(); 
					const store = getStore();

				} else {
					toast.error("Error deleting client");
				}
			},

			login: async (email, password) => {
				const { getClient } = getActions();
				try {

					const resp = await fetch(process.env.BACKEND_URL + "/api/token", {

						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							email: email,
							password: password
						})
					});

					const data = await resp.json();
					console.log(data);

					if (resp.ok) {
						localStorage.setItem("token", data.token);
						setStore({
							token: data.token,
							user: data.user
						});
						getClient();
						toast.success("Logged in! 🎉");
					} else {
						if (data.msg) {
							toast.error(data.msg);
						} else {
							toast.error("An error occurred! Please try again.");
						}
					}
				} catch (error) {
					console.error("Login error:", error);
					toast.error("An error occurred! Please check your network connection.");
				}
			},

			logout: () => {
				localStorage.removeItem("token");
				setStore({ token: null });
				setStore({ user: null });
				toast.success("Logged out! 🎉");
			},


			getMessage: async () => {
				try {
					
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
