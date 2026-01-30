import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Absen In - PT Mega Kreasi Tech");
    }

    async getHtml() {
        return `
            <div class="header">
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

            <div class="container">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <a href="/home" class="nav-back" style="margin-bottom: 0px; margin-right: 15px; color: inherit; text-decoration: none;" data-link>
                        <span class="material-icons-round">arrow_back</span>
                    </a>
                    <h2 style="font-size: 1.3rem; margin: 0;">Absen In</h2>
                </div>

                <div class="clock-display">
                    <div class="time-big" id="live-clock">08:00:00</div>
                    <div class="date-text" id="live-date">Thursday, 29 January 2026</div>
                </div>

                <div class="camera-frame">
                    <!-- Placeholder for camera stream -->
                     <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" style="width: 100%; height: 100%; object-fit: cover;" alt="Camera View">
                    
                     <div class="camera-overlay">
                        <div id="overlay-time">29 Jan 2026 08:00:00</div>
                        <div>Lokasi: Halaman Depan Kantor Pusat</div>
                     </div>
                </div>

                <button class="btn-absen">
                    ABSEN MASUK
                    <span class="material-icons-round">check_circle</span>
                </button>
            </div>

             <div class="footer">
                <span>PT Mega Kreasi Tech</span>
                <span>Since 2016</span>
            </div>
        `;
    }

    execute() {
        // Start Live Clock
        const clockEl = document.getElementById('live-clock');
        const overlayTimeEl = document.getElementById('overlay-time');

        setInterval(() => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-GB', { hour12: false });
            if (clockEl) clockEl.innerText = timeString;
            // Update overlay time too
            // Format: 29 Jan 2026 08:00:00
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            const dateString = now.toLocaleDateString('en-GB', options);
            if (overlayTimeEl) overlayTimeEl.innerText = `${dateString} ${timeString}`;

        }, 1000);
    }
}
