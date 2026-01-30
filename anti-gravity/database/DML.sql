-- Initial Parameters
INSERT INTO gen_mst_param (param_code, param_name, param_value, param_desc) VALUES
('APP_VERSION', 'Application Version', '1.0.0', 'Current version of the application'),
('COMP_NAME', 'Company Name', 'PT. Mega Kreasi Tech', 'Company Name for Display'),
('ATT_RADIUS', 'Attendance Radius', '100', 'Maximum radius in meters for attendance');

-- Initial Support Contacts
INSERT INTO supp_mst_contact (contact_name, contact_number, contact_type) VALUES
('Police', '110', 'EMERGENCY'),
('Ambulance', '118', 'EMERGENCY'),
('HR Support', '+628123456789', 'SUPPORT'),
('IT Support', '+628987654321', 'SUPPORT');

-- Initial Shifts
INSERT INTO sch_mst_shift (shift_name, shift_start_time, shift_end_time, shift_desc) VALUES
('Morning', '08:00:00', '17:00:00', 'Regular Morning Shift'),
('Night', '20:00:00', '05:00:00', 'Night Shift'),
('Flexi', '09:00:00', '18:00:00', 'Flexible Hours');

-- Initial Admin User (Password: password123 hashed - example hash)
-- Note: In production use proper hashing. This is just for seeding structure.
INSERT INTO auth_mst_user (user_email, user_fullname, user_role, user_status, user_password) VALUES
('admin@mkt.com', 'System Admin', 'ADMIN', 'ACTIVE', '$2b$10$YourHashedPasswordHere');
