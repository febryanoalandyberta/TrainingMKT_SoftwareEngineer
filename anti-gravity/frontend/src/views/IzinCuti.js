import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Izin Cuti - PT Mega Kreasi Tech");
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
                    <h2 style="font-size: 1.3rem; margin: 0;">Form Cuti</h2>
                </div>

                <div style="background: white; padding: 15px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); display: flex; align-items: center; justify-content: space-between;">
                    <div>
                        <div style="font-size: 0.8rem; color: #888;">Sisa Cuti Tahunan</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #D32F2F;">12 Hari</div>
                    </div>
                    <span class="material-icons-round" style="font-size: 2.5rem; color: #ddd;">event_available</span>
                </div>

                <form style="display: flex; flex-direction: column; gap: 15px;">
                    <div class="form-group">
                        <label class="form-label" style="font-weight: 400;">Mulai Tanggal</label>
                        <input type="date" class="form-input" style="border-radius: 8px;">
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-weight: 400;">Sampai Tanggal</label>
                        <input type="date" class="form-input" style="border-radius: 8px;">
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-weight: 400;">Keterangan Cuti</label>
                         <textarea class="form-input" style="border-radius: 8px; height: 100px;" placeholder="Alasan cuti..."></textarea>
                    </div>

                    <button type="button" class="btn-absen" style="margin-top: 20px; font-size: 1rem; padding: 12px;">Ajukan Cuti</button>
                </form>

                 <div class="footer" style="padding-top: 30px;">
                    <span>PT Mega Kreasi Tech</span>
                    <span>Since 2016</span>
                </div>
            </div>
        `;
    }
}
