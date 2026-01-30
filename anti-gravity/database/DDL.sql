-- Extension for UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- General Module
CREATE TABLE gen_mst_param (
    param_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    param_code VARCHAR(50) NOT NULL UNIQUE,
    param_name VARCHAR(100) NOT NULL,
    param_value TEXT,
    param_desc TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Auth Module
CREATE TABLE auth_mst_user (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255), -- Nullable for Google Auth users initially
    user_fullname VARCHAR(100) NOT NULL,
    user_role VARCHAR(50) DEFAULT 'USER', -- ADMIN, USER
    user_google_id VARCHAR(255) UNIQUE,
    user_status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_auth_user_email ON auth_mst_user(user_email);

-- Schedule Module
CREATE TABLE sch_mst_shift (
    shift_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shift_name VARCHAR(50) NOT NULL,
    shift_start_time TIME NOT NULL,
    shift_end_time TIME NOT NULL,
    shift_desc TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sch_trx_roster (
    roster_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    shift_id UUID NOT NULL,
    roster_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_mst_user(user_id),
    FOREIGN KEY (shift_id) REFERENCES sch_mst_shift(shift_id),
    UNIQUE (user_id, roster_date)
);

CREATE INDEX idx_sch_roster_date ON sch_trx_roster(roster_date);

-- Attendance Module
CREATE TABLE att_trx_attendance (
    att_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    roster_id UUID,
    att_date DATE NOT NULL,
    att_clock_in TIMESTAMP,
    att_clock_out TIMESTAMP,
    att_location_in VARCHAR(255),
    att_location_out VARCHAR(255),
    att_photo_in TEXT,
    att_photo_out TEXT,
    att_status VARCHAR(50), -- CHECKED_IN, CHECKED_OUT, ABSENT
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_mst_user(user_id),
    FOREIGN KEY (roster_id) REFERENCES sch_trx_roster(roster_id),
    UNIQUE (user_id, att_date)
);

CREATE TABLE att_trx_break (
    break_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    att_id UUID NOT NULL,
    break_start TIMESTAMP NOT NULL,
    break_end TIMESTAMP,
    break_type VARCHAR(50) DEFAULT 'REGULAR',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (att_id) REFERENCES att_trx_attendance(att_id)
);

-- Task Module
CREATE TABLE task_trx_todo (
    todo_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    todo_title VARCHAR(255) NOT NULL,
    todo_desc TEXT,
    todo_status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, IN_PROGRESS, DONE
    todo_due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth_mst_user(user_id)
);

CREATE INDEX idx_task_user_status ON task_trx_todo(user_id, todo_status);

-- Support Module
CREATE TABLE supp_mst_contact (
    contact_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(50) NOT NULL,
    contact_type VARCHAR(50), -- EMERGENCY, SUPPORT
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
