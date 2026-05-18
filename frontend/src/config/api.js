const rawApiUrl = import.meta.env.VITE_API_URL;
const API_URL = rawApiUrl?.replace(/\/$/, "") ?? "";

if (!API_URL) {
    console.warn("Warning: VITE_API_URL is not configured. Set it in frontend/.env or in the deployment environment variables.");
}

export default API_URL;
