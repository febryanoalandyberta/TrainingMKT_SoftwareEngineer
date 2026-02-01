const fs = require('fs');
const path = require('path');

const STORAGE_DIR = path.join(process.cwd(), 'data');
const SETTINGS_FILE = path.join(STORAGE_DIR, 'user_settings.json');

if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

let userSettings = {};

const loadSettings = () => {
    try {
        if (fs.existsSync(SETTINGS_FILE)) {
            userSettings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
        } else {
            // Default settings
            userSettings = {
                'admin@mkt.com': {
                    biometricEnabled: false,
                    attendanceReminderEnabled: false,
                    permissionsEnabled: true,
                    darkMode: false,
                    language: 'id'
                }
            };
            saveSettings();
        }
    } catch (err) {
        console.error('[UserController] Error loading settings:', err);
    }
};

const saveSettings = () => {
    try {
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify(userSettings, null, 2));
    } catch (err) {
        console.error('[UserController] Error saving settings:', err);
    }
};

loadSettings();

const userController = {
    getSettings: (req, res) => {
        const email = req.query.email || 'admin@mkt.com';
        const settings = userSettings[email] || {
            biometricEnabled: false,
            attendanceReminderEnabled: false,
            permissionsEnabled: true,
            darkMode: false,
            language: 'id'
        };
        res.json({ success: true, data: settings });
    },

    updateSettings: (req, res) => {
        const { email, settings } = req.body;
        const targetEmail = email || 'admin@mkt.com';

        userSettings[targetEmail] = {
            ...(userSettings[targetEmail] || {}),
            ...settings
        };

        saveSettings();
        res.json({ success: true, message: 'Settings updated successfully', data: userSettings[targetEmail] });
    }
};

module.exports = userController;
