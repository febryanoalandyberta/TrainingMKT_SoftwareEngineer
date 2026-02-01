import { ScheduleAPI } from "./ScheduleAPI.js";

const HOLIDAYS_2026 = {
    0: { 1: "Tahun Baru 2026", 19: "Isra Mikraj" },
    1: { 17: "Tahun Baru Imlek" },
    2: { 19: "Hari Suci Nyepi", 20: "Hari Raya Idul Fitri", 21: "Hari Raya Idul Fitri" },
    3: { 3: "Wafat Isa Almasih" },
    4: { 1: "Hari Buruh", 14: "Kenaikan Isa Almasih", 31: "Hari Raya Waisak" },
    5: { 1: "Hari Lahir Pancasila", 27: "Hari Raya Idul Adha" },
    6: { 17: "Tahun Baru Islam" },
    7: { 17: "Hari Kemerdekaan RI" },
    8: { 25: "Maulid Nabi Muhammad SAW" },
    11: { 25: "Hari Raya Natal" }
};

const SHIFT_START_TIMES = {
    'P': '06:00',
    'S': '12:00',
    'M': '15:00',
    'PH-P': '06:00',
    'PH-S': '12:00',
    'PH-M': '15:00',
    'NS': '11:00'
};

export const ReminderService = {
    lastReminderShown: null,

    async check() {
        const isEnabled = localStorage.getItem('attendance_reminder_enabled') === 'true';
        if (!isEnabled) return;

        try {
            const now = new Date();
            const todayStr = now.toISOString().split('T')[0]; // YYYY-MM-DD

            // Avoid showing multiple times for the same shift reminder
            if (this.lastReminderShown === todayStr) return;

            // 1. Get shift for today
            const shiftCode = await this.getTodayShiftCode();
            if (!shiftCode || shiftCode === 'Off' || shiftCode === 'OFF') return;

            const startTimeStr = SHIFT_START_TIMES[shiftCode];
            if (!startTimeStr) return;

            // 2. Parse shift start time
            const [hours, minutes] = startTimeStr.split(':').map(Number);
            const shiftStartTime = new Date();
            shiftStartTime.setHours(hours, minutes, 0, 0);

            // 3. Calculate difference
            const diffMs = shiftStartTime - now;
            const diffMins = Math.floor(diffMs / 60000);

            // 4. Trigger if within 10 minutes window (e.g., between 8 and 10 mins before)
            // Or just check if current time passed the "Reminder Threshold" (10 mins before)
            if (diffMins <= 10 && diffMins > 0) {
                this.showReminder(shiftCode, startTimeStr);
                this.lastReminderShown = todayStr;
            }
        } catch (error) {
            console.error('[ReminderService] Error checking schedule:', error);
        }
    },

    async getTodayShiftCode() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const day = now.getDate();
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // 1. Check Overrides (Supervisor edit)
        const res = await ScheduleAPI.getOverrides();
        if (res.success && res.data[dateStr]) {
            return res.data[dateStr];
        }

        // 2. Check for Holiday (PH Shifting)
        const isHoliday = HOLIDAYS_2026[month] && HOLIDAYS_2026[month][day];
        if (isHoliday) {
            const phPattern = day % 3;
            if (phPattern === 0) return 'PH-P';
            if (phPattern === 1) return 'PH-S';
            return 'PH-M';
        }

        // 3. Normal Pattern
        const dayOfWeek = now.getDay();
        if (dayOfWeek === 0) return 'Off';

        const pattern = day % 4;
        switch (pattern) {
            case 0: return 'P';
            case 1: return 'S';
            case 2: return 'M';
            case 3: return 'NS';
        }
        return null;
    },

    showReminder(shiftCode, startTime) {
        console.log(`[ReminderService] Triggering reminder for shift ${shiftCode} at ${startTime}`);

        // Show Browser Notification if allowed
        if (Notification.permission === "granted") {
            new Notification("Pengingat Absensi", {
                body: `Shift ${shiftCode} Anda akan dimulai pukul ${startTime}. Jangan lupa absen!`,
                icon: "/vite.svg"
            });
        } else {
            // Fallback to Alert
            alert(`📢 PENGINGAT ABSENSI!\n\nShift ${shiftCode} Anda akan dimulai pukul ${startTime}.\nMohon segera lakukan Absen In.`);
        }
    }
};
