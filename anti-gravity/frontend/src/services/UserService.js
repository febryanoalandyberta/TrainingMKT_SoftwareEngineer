import { AuthService } from "./AuthService.js";
import { AppConfig } from "../config.js";

const API_BASE_URL = `${AppConfig.API_BASE_URL}/users`;

export const UserService = {
    async getSettings() {

        try {
            const user = AuthService.getUser();
            const response = await fetch(`${API_BASE_URL}/settings?email=${encodeURIComponent(user.email || 'admin@mkt.com')}`);
            const result = await response.json();
            return result.success ? result.data : null;
        } catch (error) {
            console.error('[UserService] Error fetching settings:', error);
            return null;
        }
    },

    async updateSettings(settings) {
        try {
            const user = AuthService.getUser();
            const response = await fetch(`${API_BASE_URL}/settings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email || 'admin@mkt.com',
                    settings
                })
            });
            return await response.json();
        } catch (error) {
            console.error('[UserService] Error updating settings:', error);
            return { success: false, error };
        }
    }
};
