const fs = require('fs');
const path = require('path');

// Storage Config
const STORAGE_DIR = path.join(process.cwd(), 'data');
const PERMISSIONS_FILE = path.join(STORAGE_DIR, 'permissions.json');
const ATTENDANCE_FILE = path.join(STORAGE_DIR, 'attendance_logs.json');

// Ensure directory exists
if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

// Initial Data
let permissions = [];
let attendanceLogs = [];

const loadData = () => {
    try {
        if (fs.existsSync(PERMISSIONS_FILE)) {
            permissions = JSON.parse(fs.readFileSync(PERMISSIONS_FILE, 'utf8'));
        }
        if (fs.existsSync(ATTENDANCE_FILE)) {
            attendanceLogs = JSON.parse(fs.readFileSync(ATTENDANCE_FILE, 'utf8'));
        }
    } catch (err) {
        console.error('[AttendanceController] Error loading data:', err);
    }
};

loadData();

const saveData = (file, data) => {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(`[AttendanceController] Error saving to ${file}:`, err);
    }
};

const attendanceController = {
    // Submit generic attendance log (Absen In/Out, Break In/Out)
    submitLog: (req, res) => {
        const { type, data } = req.body;

        const newLog = {
            id: Date.now(),
            type,
            ...data,
            serverTimestamp: new Date()
        };

        attendanceLogs.unshift(newLog); // Newest first
        saveData(ATTENDANCE_FILE, attendanceLogs);

        res.status(201).json({
            success: true,
            message: `${type} recorded on server`,
            data: newLog
        });
    },

    getHistory: (req, res) => {
        loadData();
        // Combined history for simplicity or keep separate?
        // Let's keep separate but focus on permissions for the history view
        res.json({ success: true, data: permissions });
    },

    getAttendanceLogs: (req, res) => {
        loadData();
        res.json({ success: true, data: attendanceLogs });
    },

    submitPermission: (req, res) => {
        const { type, description, employeeId, userName, startDate, endDate, attachment } = req.body;

        const newPermission = {
            id: Date.now(),
            employeeId: employeeId || 'N/A',
            userName: userName || 'Unknown',
            type: type || 'Generic',
            startDate: startDate || null,
            endDate: endDate || null,
            description: description || '',
            attachment: attachment || null,
            status: 'PENDING',
            submittedAt: new Date()
        };

        permissions.unshift(newPermission);
        saveData(PERMISSIONS_FILE, permissions);

        res.status(201).json({
            success: true,
            message: 'Permission application submitted successfully',
            data: newPermission
        });
    }
};

module.exports = attendanceController;
