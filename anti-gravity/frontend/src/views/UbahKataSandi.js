import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Ubah Kata Sandi - PT Mega Kreasi Tech");
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
                    <h2 style="font-size: 1.3rem; margin: 0;">Ubah Kata Sandi</h2>
                </div>
                
                <form style="display: flex; flex-direction: column; gap: 15px;">
                    <div class="form-group">
                        <label class="form-label" style="font-weight: 400;">Kata Sandi Lama</label>
                        <div style="position: relative;">
                            <input type="password" class="form-input" style="border-radius: 8px; padding-right: 40px;" value="password123">
                            <span class="material-icons-round" style="position: absolute; right: 10px; top: 10px; color: #555;">visibility_off</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-weight: 400;">Kata Sandi Baru</label>
                        <div style="position: relative;">
                            <input type="password" class="form-input" style="border-radius: 8px; padding-right: 40px;" value="password123">
                            <span class="material-icons-round" style="position: absolute; right: 10px; top: 10px; color: #555;">visibility_off</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-weight: 400;">Konfirmasi Kata Sandi</label>
                        <div style="position: relative;">
                             <input type="password" class="form-input" style="border-radius: 8px; padding-right: 40px;" value="password123">
                            <span class="material-icons-round" style="position: absolute; right: 10px; top: 10px; color: #555;">visibility_off</span>
                        </div>
                    </div>

                    <button type="submit" class="btn-absen" style="margin-top: 20px; font-size: 1rem; padding: 12px;">Simpan</button>
                </form>

                 <div class="footer" style="padding-top: 50px;">
                    <span>PT Mega Kreasi Tech</span>
                    <span>Since 2016</span>
                </div>
            </div>
        `;
    }
}
