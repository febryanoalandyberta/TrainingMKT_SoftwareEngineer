import AbstractView from "./AbstractView.js";
import { AuthService } from "../services/AuthService.js";
import { UserService } from "../services/UserService.js";


export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Settings - PT Mega Kreasi Tech");
    }

    async getHtml() {
        const user = AuthService.getUser();
        const savedPhoto = localStorage.getItem('user_profile_photo') || null;

        // Fetch from backend
        let settings = await UserService.getSettings();

        // Default local values if backend fetch fails
        if (!settings) {
            settings = {
                biometricEnabled: localStorage.getItem('biometric_enabled') === 'true',
                attendanceReminderEnabled: localStorage.getItem('attendance_reminder_enabled') === 'true',
                permissionsEnabled: localStorage.getItem('permissions_enabled') !== 'false', // Default true
                darkMode: localStorage.getItem('dark_mode_enabled') === 'true',
                language: localStorage.getItem('app_language') || 'id'
            };
        } else {
            // Update local storage to match backend for other services
            localStorage.setItem('biometric_enabled', settings.biometricEnabled);
            localStorage.setItem('attendance_reminder_enabled', settings.attendanceReminderEnabled);
            localStorage.setItem('permissions_enabled', settings.permissionsEnabled);
            localStorage.setItem('dark_mode_enabled', settings.darkMode);
            localStorage.setItem('app_language', settings.language);
        }

        const { biometricEnabled, attendanceReminderEnabled: reminderEnabled, permissionsEnabled, darkMode, language } = settings;
        const langDisplay = language === 'id' ? 'Indonesia' : 'English';

        return `
            <div class="header">
                 <div class="header-content">
                     <div class="logo-section">
                        <div class="logo-box">M</div>
                        <span class="company-name">PT Mega Kreasi Tech</span>
                    </div>
                     <div class="user-profile">
                        <div class="user-info">
                            <h4>${user.name}</h4>
                            <p>${user.role}</p>
                        </div>
                        <a href="/profile" data-link style="text-decoration: none; color: inherit; display: flex;">
                             ${savedPhoto
                ? `<img src="${savedPhoto}" class="avatar-img">`
                : `<span class="material-icons-round avatar">account_circle</span>`
            }
                        </a>
                    </div>
                 </div>
            </div>

            <div class="container" style="gap: 10px;">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <a href="/home" class="nav-back" style="margin-bottom: 0px; margin-right: 15px; color: inherit; text-decoration: none;" data-link>
                        <span class="material-icons-round">arrow_back</span>
                    </a>
                    <h2 style="font-size: 1.3rem; margin: 0;">Settings</h2>
                </div>

                <h3 style="font-size: 1rem; color: #000; margin-bottom: 5px;">Keamanan</h3>
                <a href="/change-password" class="menu-item-row" data-link>
                    <span class="material-icons-round">lock</span>
                    <span style="flex: 1; text-align: left; margin-left: 10px;">Ubah Kata Sandi</span>
                    <span class="material-icons-round">chevron_right</span>
                </a>
                <div class="menu-item-row">
                    <span class="material-icons-round">fingerprint</span>
                    <span style="flex: 1; margin-left: 10px;">Login Biometrik</span>
                    <span id="biometric-toggle" class="material-icons-round toggle-icon" style="color: ${biometricEnabled ? '#4CAF50' : '#999'}; font-size: 2rem; cursor: pointer;">
                        ${biometricEnabled ? 'toggle_on' : 'toggle_off'}
                    </span>
                </div>

                <h3 style="font-size: 1rem; color: #000; margin-bottom: 5px; margin-top: 10px;">Notifikasi</h3>
                <div class="menu-item-row">
                    <span class="material-icons-round">notifications</span>
                    <span style="flex: 1; margin-left: 10px;">Pengingat Absen</span>
                    <span id="reminder-toggle" class="material-icons-round toggle-icon" style="color: ${reminderEnabled ? '#4CAF50' : '#999'}; font-size: 2rem; cursor: pointer;">
                        ${reminderEnabled ? 'toggle_on' : 'toggle_off'}
                    </span>
                </div>

                <h3 style="font-size: 1rem; color: #000; margin-bottom: 5px; margin-top: 10px;">Izin & Diagnostik</h3>
                 <a href="/calibration" class="menu-item-row" data-link>
                    <span class="material-icons-round">place</span>
                    <span style="flex: 1; text-align: left; margin-left: 10px;">Kalibrasi Lokasi/GPS</span>
                    <span class="material-icons-round">chevron_right</span>
                </a>
                 <div class="menu-item-row">
                    <span class="material-icons-round">camera_alt</span>
                    <span style="flex: 1; margin-left: 10px;">Izin Kamera & Storage</span>
                    <span id="permissions-toggle" class="material-icons-round toggle-icon" style="color: ${permissionsEnabled ? '#4CAF50' : '#999'}; font-size: 2rem; cursor: pointer;">
                        ${permissionsEnabled ? 'toggle_on' : 'toggle_off'}
                    </span>
                </div>

                <h3 style="font-size: 1rem; color: #000; margin-bottom: 5px; margin-top: 10px;">Umum</h3>
                 <div class="menu-item-row">
                    <span class="material-icons-round" style="transform: rotate(-45deg);">nightlight_round</span>
                    <span style="flex: 1; margin-left: 10px;">Mode Gelap</span>
                    <span id="dark-mode-toggle" class="material-icons-round toggle-icon" style="color: ${darkMode ? '#4CAF50' : '#999'}; font-size: 2rem; cursor: pointer;">
                        ${darkMode ? 'toggle_on' : 'toggle_off'}
                    </span>
                </div>
                 <div class="menu-item-row" id="language-setting" style="cursor: pointer;">
                    <span class="material-icons-round">language</span>
                    <span style="flex: 1; text-align: left; margin-left: 10px;">Bahasa</span>
                    <span style="color: #555; font-size: 0.9rem; margin-right: 5px;">${langDisplay}</span>
                    <span class="material-icons-round">chevron_right</span>
                </div>

                <a href="/login" class="menu-item-row" style="margin-top: 20px; color: #D32F2F;" data-link>
                    <span class="material-icons-round">logout</span>
                    <span style="flex: 1; text-align: left; margin-left: 10px; font-weight: bold;">Keluar Aplikasi</span>
                </a>

                <div class="footer" style="padding: 20px 0;">
                    <span>PT Mega Kreasi Tech</span>
                    <span>Since 2016</span>
                </div>
            </div>
        `;
    }

    execute() {
        const biometricToggle = document.getElementById('biometric-toggle');
        const reminderToggle = document.getElementById('reminder-toggle');
        const permissionsToggle = document.getElementById('permissions-toggle');
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        const languageSetting = document.getElementById('language-setting');

        const updateToggleServer = async (element, key, storageKey, alertMsg) => {
            const isEnabled = element.innerText === 'toggle_on';
            const newState = !isEnabled;
            element.innerText = newState ? 'toggle_on' : 'toggle_off';
            element.style.color = newState ? '#4CAF50' : '#999';
            localStorage.setItem(storageKey, newState);
            await UserService.updateSettings({ [key]: newState });
            if (newState && alertMsg) alert(alertMsg);
        };

        if (biometricToggle) {
            biometricToggle.onclick = () => updateToggleServer(biometricToggle, 'biometricEnabled', 'biometric_enabled', 'Login Biometrik Berhasil Diaktifkan');
        }

        if (reminderToggle) {
            reminderToggle.onclick = () => updateToggleServer(reminderToggle, 'attendanceReminderEnabled', 'attendance_reminder_enabled', 'Pengingat Absensi Berhasil Diaktifkan (10 Menit Sebelum Shift)');
        }

        if (permissionsToggle) {
            permissionsToggle.onclick = () => updateToggleServer(permissionsToggle, 'permissionsEnabled', 'permissions_enabled');
        }

        if (darkModeToggle) {
            darkModeToggle.onclick = () => updateToggleServer(darkModeToggle, 'darkMode', 'dark_mode_enabled');
        }

        if (languageSetting) {
            languageSetting.onclick = async () => {
                const current = localStorage.getItem('app_language') || 'id';
                const next = current === 'id' ? 'en' : 'id';
                localStorage.setItem('app_language', next);
                await UserService.updateSettings({ language: next });

                // Refresh to show change (Simulated)
                history.pushState(null, null, '/settings');
                window.dispatchEvent(new Event('popstate'));
                alert(`Bahasa diubah ke ${next === 'id' ? 'Indonesia' : 'English'}`);
            };
        }
    }
}
