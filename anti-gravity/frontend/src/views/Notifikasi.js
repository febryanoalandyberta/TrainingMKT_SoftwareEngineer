import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Notifikasi - PT Mega Kreasi Tech");
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

            <div class="container" style="background: #F5F5F5;">
                 <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <a href="/home" class="nav-back" style="margin-bottom: 0px; margin-right: 15px; color: inherit; text-decoration: none;" data-link>
                        <span class="material-icons-round">arrow_back</span>
                    </a>
                    <h2 style="font-size: 1.3rem; margin: 0;">Notifikasi</h2>
                </div>
                
                <!-- Card 1 -->
                <div class="notif-card">
                    <div class="notif-icon-box">
                         <span class="material-icons-round" style="font-size: 2.5rem; color: #D32F2F;">assignment</span>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0; font-size: 0.95rem;">Tugas Baru dari Atasan</h4>
                        <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #555;">Laporan Bulanan</p>
                    </div>
                    <div style="font-size: 0.7rem; color: #888; align-self: flex-end;">10:30 AM</div>
                </div>

                <!-- Card 2 -->
                <div class="notif-card">
                    <div class="notif-icon-box">
                         <span class="material-icons-round" style="font-size: 2.5rem; color: #D32F2F;">campaign</span>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0; font-size: 0.95rem;">Pengumuman Perusahaan</h4>
                        <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #555;">Maintenance Sistem</p>
                    </div>
                    <div style="font-size: 0.7rem; color: #888; align-self: flex-end;">Yesterday, 4:00 PM</div>
                </div>

                 <!-- Card 3 -->
                <div class="notif-card">
                    <div class="notif-icon-box">
                         <span class="material-icons-round" style="font-size: 2.5rem; color: #D32F2F;">meeting_room</span>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0; font-size: 0.95rem;">Berhasil Absen In</h4>
                        <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #555;">08:00 WIB</p>
                    </div>
                    <div style="font-size: 0.7rem; color: #888; align-self: flex-end;">Today, 8:00 AM</div>
                </div>

                 <!-- Card 4 -->
                <div class="notif-card">
                    <div class="notif-icon-box">
                         <span class="material-icons-round" style="font-size: 2.5rem; color: #D32F2F; transform: scaleX(-1);">meeting_room</span>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0; font-size: 0.95rem;">Berhasil Absen Out</h4>
                        <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #555;">17:00 WIB</p>
                    </div>
                    <div style="font-size: 0.7rem; color: #888; align-self: flex-end;">Yesterday, 5:00 PM</div>
                </div>
                
                 <div class="footer">
                    <span>PT Mega Kreasi Tech</span>
                    <span>Since 2016</span>
                </div>
            </div>
        `;
    }
}
