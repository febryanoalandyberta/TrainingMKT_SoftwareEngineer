import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Settings - PT Mega Kreasi Tech");
    }

    async getHtml() {
        return `
            <div class="header">
                 <!-- Top Row: Back Arrow if needed (Settings uses container back, but let's keep consistent if other pages use header back, but Settings code shows back in container. Wait, checking previous step 424... Settings header has only Logo+Profile. Ah, the back button was moved to container. So header only needs Logo+Profile) -->
                 <!-- User wanted logo below dashboard. If Settings has back button in container, the Header is just Logo+Profile.
                      However, if we want consistency with Home, maybe just keep them in one row if there is no top element? 
                      The user said "all pages containing logo...". 
                      But if Home has Hamburger on top, Settings might need spacing. 
                      Actually, Settings has NO hamburger in header. It has Logo+Profile.
                      Let's apply .header-content to ensure alignment. -->
                 <div class="header-content">
                     <div class="logo-section">
                        <div class="logo-box">M</div>
                        <span class="company-name">PT Mega Kreasi Tech</span>
                    </div>
                     <div class="user-profile">
                        <div class="user-info">
                            <h4>Febryano Alandy</h4>
                            <p>IT Support</p>
                        </div>
                         <span class="material-icons-round avatar">account_circle</span>
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
                    <span class="material-icons-round toggle-icon" style="color: #4CAF50; font-size: 2rem; cursor: pointer;">toggle_on</span>
                </div>

                <h3 style="font-size: 1rem; color: #000; margin-bottom: 5px; margin-top: 10px;">Notifikasi</h3>
                <a href="/notifications" class="menu-item-row" data-link>
                    <span class="material-icons-round">notifications</span>
                    <span style="flex: 1; text-align: left; margin-left: 10px;">Pengingat Absen</span>
                    <span class="material-icons-round toggle-icon" style="color: #4CAF50; font-size: 2rem; cursor: pointer;">toggle_on</span>
                </a>

                <h3 style="font-size: 1rem; color: #000; margin-bottom: 5px; margin-top: 10px;">Izin & Diagnostik</h3>
                 <a href="/calibration" class="menu-item-row" data-link>
                    <span class="material-icons-round">place</span>
                    <span style="flex: 1; text-align: left; margin-left: 10px;">Kalibrasi Lokasi/GPS</span>
                    <span class="material-icons-round">chevron_right</span>
                </a>
                 <div class="menu-item-row">
                    <span class="material-icons-round">camera_alt</span>
                    <span style="flex: 1; margin-left: 10px;">Izin Kamera & Storage</span>
                    <span class="material-icons-round toggle-icon" style="color: #4CAF50; font-size: 2rem; cursor: pointer;">toggle_on</span>
                </div>

                <h3 style="font-size: 1rem; color: #000; margin-bottom: 5px; margin-top: 10px;">Umum</h3>
                 <div class="menu-item-row">
                    <span class="material-icons-round" style="transform: rotate(-45deg);">nightlight_round</span>
                    <span style="flex: 1; margin-left: 10px;">Mode Gelap</span>
                    <span class="material-icons-round toggle-icon" style="color: #4CAF50; font-size: 2rem; cursor: pointer;">toggle_on</span>
                </div>
                 <a href="/language" class="menu-item-row" data-link>
                    <span class="material-icons-round">language</span>
                    <span style="flex: 1; text-align: left; margin-left: 10px;">Bahasa</span>
                    <span style="color: #555; font-size: 0.9rem; margin-right: 5px;">Indonesia</span>
                    <span class="material-icons-round">chevron_right</span>
                </a>

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
        const toggles = document.querySelectorAll('.toggle-icon');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                if (toggle.innerText === 'toggle_on') {
                    toggle.innerText = 'toggle_off';
                    toggle.style.color = '#999';
                } else {
                    toggle.innerText = 'toggle_on';
                    toggle.style.color = '#4CAF50';
                }
            });
        });
    }
}
