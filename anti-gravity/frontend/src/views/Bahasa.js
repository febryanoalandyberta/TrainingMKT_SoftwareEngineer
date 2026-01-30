import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Pilih Bahasa - PT Mega Kreasi Tech");
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
                    <h2 style="font-size: 1.3rem; margin: 0;">Pilih Bahasa</h2>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd; display: flex; align-items: center; justify-content: space-between;">
                        <span>Bahasa Indonesia</span>
                         <span class="material-icons-round" style="color: #4CAF50;">check_circle</span>
                    </div>

                    <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #ddd; display: flex; align-items: center; justify-content: space-between;">
                        <span>English (US)</span>
                    </div>
                </div>

                <button class="btn-absen" style="font-size: 1.1rem; padding: 12px; border-radius: 25px; margin-top: auto; margin-bottom: 40px;">Simpan</button>

                 <div class="footer">
                    <span>PT Mega Kreasi Tech</span>
                    <span>Since 2016</span>
                </div>
            </div>
        `;
    }
}
