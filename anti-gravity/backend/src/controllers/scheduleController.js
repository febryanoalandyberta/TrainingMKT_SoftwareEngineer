const fs = require('fs');
const path = require('path');

const STORAGE_DIR = path.join(process.cwd(), 'data');
const STORAGE_FILE = path.join(STORAGE_DIR, 'schedule_overrides.json');

// Ensure directory exists
if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

let overrides = {};
const loadFromDisk = () => {
    try {
        if (fs.existsSync(STORAGE_FILE)) {
            overrides = JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf8'));
        }
    } catch (err) {
        console.error('[SCHEDULE] Error loading overrides:', err);
    }
};

loadFromDisk();

const saveToDisk = () => {
    try {
        fs.writeFileSync(STORAGE_FILE, JSON.stringify(overrides, null, 2));
    } catch (err) {
        console.error('[SCHEDULE] Error saving overrides:', err);
    }
};

const scheduleController = {
    getOverrides: (req, res) => {
        loadFromDisk();
        res.json({ success: true, data: overrides });
    },

    updateOverride: (req, res) => {
        const { dateStr, shiftType } = req.body;

        if (!dateStr || shiftType === undefined) {
            return res.status(400).json({ success: false, message: 'Missing dateStr or shiftType' });
        }

        overrides[dateStr] = shiftType;
        saveToDisk();

        res.json({ success: true, message: 'Schedule updated successfully', data: overrides });
    }
};

module.exports = scheduleController;
