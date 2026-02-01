export const AppConfig = {
    // Use relative path so requests go through the Vite Proxy (Same Origin)
    // This avoids CORS issues and the need for the phone to trust the backend port explicitly
    API_BASE_URL: `/api/v1`
};
