import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Kalibrasi GPS - PT Mega Kreasi Tech");
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
                    <a href="/settings" class="nav-back" style="margin-bottom: 0px; margin-right: 15px; color: inherit; text-decoration: none;" data-link>
                        <span class="material-icons-round">arrow_back</span>
                    </a>
                    <h2 style="font-size: 1.3rem; margin: 0;">Kalibrasi Lokasi/GPS</h2>
                </div>

                <div style="background: #e0e0e0; border-radius: 12px; overflow: hidden; height: 300px; position: relative; margin-bottom: 20px;">
                    <!-- Embed Google Maps with dynamic coordinates -->
                    <iframe 
                        id="google-map-iframe"
                        width="100%" 
                        height="100%" 
                        frameborder="0" 
                        style="border:0" 
                        src="https://maps.google.com/maps?q=-6.2088,106.8456&z=15&output=embed" 
                        allowfullscreen>
                    </iframe>
                </div>

                <div style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 30px;">
                    <div>Status GPS: <span id="gps-status" style="color: #4CAF50; font-weight: bold;">Terhubung</span></div>
                    <div>Akurasi: <span id="gps-accuracy">5</span> meter</div>
                    <div>Koordinat: <span id="gps-coords">-6.2088, 106.8456</span></div>
                </div>

                <button id="btn-kalibrasi" class="btn-absen" style="font-size: 1.1rem; padding: 12px; border-radius: 25px;">Mulai Kalibrasi</button>

                 <div class="footer" style="padding-top: 20px;">
                    <span>PT Mega Kreasi Tech</span>
                    <span>Since 2016</span>
                </div>
            </div>
        `;
    }

    execute() {
        const btn = document.getElementById('btn-kalibrasi');
        const statusEl = document.getElementById('gps-status');
        const accEl = document.getElementById('gps-accuracy');
        const coordsEl = document.getElementById('gps-coords');
        const mapIframe = document.getElementById('google-map-iframe');

        btn.addEventListener('click', () => {
            statusEl.innerText = "Mencari...";
            statusEl.style.color = "orange";

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    const acc = Math.round(position.coords.accuracy);

                    statusEl.innerText = "Terhubung";
                    statusEl.style.color = "#4CAF50";
                    accEl.innerText = acc;
                    coordsEl.innerText = `${lat.toFixed(4)}, ${long.toFixed(4)}`;

                    // Update Map
                    mapIframe.src = `https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`;

                    alert("Kalibrasi Berhasil!");

                }, (error) => {
                    statusEl.innerText = "Gagal";
                    statusEl.style.color = "red";
                    alert("Gagal mendapatkan lokasi: " + error.message);
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        });
    }
}
