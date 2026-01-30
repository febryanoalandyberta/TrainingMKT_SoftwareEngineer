import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Forgot Password - PT Mega Kreasi Tech");
    }

    async getHtml() {
        return `
            <div class="container" style="background: #F5F5F5; justify-content: center; text-align: center;">
                
                <h2 style="font-weight: 500; font-size: 1.5rem; color: #555; margin-bottom: 20px;">Forgot Password</h2>
                
                <div style="border-top: 1px solid #999; border-bottom: 1px solid #999; padding: 15px 0; margin-bottom: 40px;">
                    <p style="color: #666; font-size: 0.9rem; margin: 0; line-height: 1.5;">
                        Masukkan email Anda dan kami akan<br>
                        mengirimkan Anda tautan untuk setel ulang<br>
                        kata sandi
                    </p>
                </div>

                <form id="forgotForm" style="width: 100%;">
                    <div class="form-group" style="text-align: left;">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-input" placeholder="Masukan email anda" required>
                    </div>

                    <button type="submit" class="btn" style="width: 100%; margin-top: 20px; border-radius: 8px; border: 2px solid black; font-weight: bold;">Kirim Tautan ke Email</button>
                </form>

                 <div class="footer" style="position: absolute; bottom: 0; left: 0; right: 0;">
                    <span>PT Mega Kreasi Tech</span>
                    <span>Since 2016</span>
                </div>
            </div>
        `;
    }

    execute() {
        document.getElementById('forgotForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Reset link sent!");
            history.pushState(null, null, '/login');
            window.dispatchEvent(new Event('popstate'));
        });
    }
}
