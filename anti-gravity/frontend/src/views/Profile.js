import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Profile - PT Mega Kreasi Tech");
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
                    <h2 style="font-size: 1.3rem; margin: 0;">Profile</h2>
                </div>
                
                <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 40px;">
                    <span class="material-icons-round" style="font-size: 6rem; color: #1a1a1a;">account_circle</span>
                    <h2 style="font-size: 1.1rem; color: #555; font-weight: 500; margin-top: 10px;">Febryano Alandy Berta</h2>
                </div>

                <div style="display: grid; grid-template-columns: 100px 1fr; row-gap: 15px; font-size: 0.95rem; color: #333;">
                    
                    <div>Jabatan</div>
                    <div style="font-weight: 400;">: Staff</div>

                    <div>Divisi</div>
                    <div style="font-weight: 400;">: IT Teknisi</div>

                    <div>ID</div>
                    <div style="font-weight: 400;">: MKT05112024</div>

                    <div>No.Telfon</div>
                    <div style="font-weight: 400;">: 08161190241</div>

                    <div>Email</div>
                    <div style="font-weight: 400;">: febryanoit@megakreasitech.com</div>

                    <div>Alamat</div>
                    <div style="font-weight: 400;">: Jl. Bango III Pondok Labu</div>

                    <div>Office</div>
                    <div style="font-weight: 400;">: Jl. Lebak Bulus 1 No.1 Cilandak</div>

                </div>

                 <div class="footer" style="padding-top: 40px;">
                    <span>PT Mega Kreasi Tech</span>
                    <span>Since 2016</span>
                </div>
            </div>
        `;
    }
}
