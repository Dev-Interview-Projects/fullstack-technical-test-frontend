const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL no está definido en las variables de entorno");
}

export const config = {
  apiUrl: API_URL,
};
