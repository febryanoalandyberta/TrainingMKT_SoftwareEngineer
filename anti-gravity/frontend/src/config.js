export const AppConfig = {
    // Use relative path so requests go through the Vite Proxy (Same Origin)
    // This avoids CORS issues and the need for the phone to trust the backend port explicitly
    // Use environment variable if available (Production), otherwise fallback to proxy path (Dev)
    API_BASE_URL: import.meta.env.VITE_API_URL || `/api/v1`
};
