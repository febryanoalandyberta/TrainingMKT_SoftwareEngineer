export const AppConfig = {
    // If VITE_API_URL is set (e.g. via Vercel env vars), use it.
    // Otherwise fallback to local proxy path (dev mode)
    // IMPORTANT: In Vercel, set VITE_API_URL to your Render Backend URL (e.g. https://my-app.onrender.com/api/v1)
    API_BASE_URL: import.meta.env.VITE_API_URL || '/api/v1'
};
