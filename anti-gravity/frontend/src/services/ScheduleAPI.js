export const ScheduleAPI = {
    async getOverrides() {
        const url = `http://10.20.0.57:5000/api/v1/schedule/overrides?t=${Date.now()}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('[ScheduleAPI] Error fetching overrides:', error);
            return { success: false, data: {} };
        }
    },

    async updateOverride(dateStr, shiftType) {
        const url = 'http://10.20.0.57:5000/api/v1/schedule/overrides';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dateStr, shiftType })
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('[ScheduleAPI] Error updating override:', error);
            return { success: false, error: error.message };
        }
    }
};
