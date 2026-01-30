import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Izin - PT Mega Kreasi Tech");
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
                    <h2 style="font-size: 1.3rem; margin: 0;">Form Izin</h2>
                </div>

                <form style="display: flex; flex-direction: column; gap: 15px;">
                    <div class="form-group">
                        <label class="form-label" style="font-weight: 400;">Jenis Izin</label>
                        <select class="form-input" style="border-radius: 8px;">
                            <option>Sakit</option>
                            <option>Keperluan Pribadi</option>
                            <option>Dinas Luar</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-weight: 400;">Keterangan</label>
                        <textarea class="form-input" style="border-radius: 8px; height: 100px;" placeholder="Jelaskan alasan izin..."></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-weight: 400;">Lampiran (Foto Surat Dokter/Lainnya)</label>
                        <div style="border: 2px dashed #ccc; padding: 20px; text-align: center; border-radius: 8px; background: white; color: #888;">
                            <span class="material-icons-round" style="font-size: 2rem;">cloud_upload</span>
                            <div>Upload File</div>
                        </div>
                    </div>

                    <button type="button" class="btn-absen" style="margin-top: 20px; font-size: 1rem; padding: 12px;">Ajukan Izin</button>
                </form>

                 <div class="footer" style="padding-top: 30px;">
                    <span>PT Mega Kreasi Tech</span>
                    <span>Since 2016</span>
                </div>
            </div>
        `;
    }
}
