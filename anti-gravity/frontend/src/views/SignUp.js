import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Sign Up - PT Mega Kreasi Tech");
    }

    async getHtml() {
        return `
            <div class="container" style="background: #EFEFEF; padding: 20px;">
                <form id="signupForm" style="display: flex; flex-direction: column; gap: 15px;">
                    
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.9rem;">Nama Lengkap</label>
                        <input type="text" class="form-input" placeholder="Masukan nama lengkap anda" style="background: white; padding: 8px;" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.9rem;">Jabatan</label>
                        <input type="text" class="form-input" placeholder="Masukan Jabatan anda" style="background: white; padding: 8px;" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.9rem;">Divisi</label>
                        <input type="text" class="form-input" placeholder="Masukan Divisi anda" style="background: white; padding: 8px;" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.9rem;">Email</label>
                        <input type="email" class="form-input" placeholder="Masukan Email anda" style="background: white; padding: 8px;" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.9rem;">Alamat</label>
                        <input type="text" class="form-input" placeholder="Masukan Alamat anda" style="background: white; padding: 8px;" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.9rem;">No. Telfon / Whatsapp</label>
                        <input type="tel" class="form-input" placeholder="Masukan No. Telfon / Whatsapp anda" style="background: white; padding: 8px;" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.9rem;">Nama Kontak Darurat</label>
                        <input type="text" class="form-input" placeholder="Masukan Nama Kontak Darurat anda" style="background: white; padding: 8px;" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.9rem;">No. Telfon / Whatsapp Kontak Darurat</label>
                        <input type="tel" class="form-input" placeholder="Masukan No. Kontak Darurat anda" style="background: white; padding: 8px;" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.9rem;">Password</label>
                        <input type="password" class="form-input" placeholder="Masukan Password anda" style="background: white; padding: 8px;" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.9rem;">Konfirmasi Password</label>
                        <input type="password" class="form-input" placeholder="Konfirmasi Password anda" style="background: white; padding: 8px;" required>
                    </div>

                    <button type="submit" class="btn" style="margin-top: 20px; background: white; border: 1px solid black; width: 150px; align-self: center;">Sign Up</button>

                </form>

                <div class="footer" style="padding: 20px 0; margin-top: 20px;">
                    <span>PT Mega Kreasi Tech</span>
                    <span>Since 2016</span>
                </div>
            </div>
        `;
    }

    execute() {
        document.getElementById('signupForm').addEventListener('submit', (e) => {
            e.preventDefault();
            history.pushState(null, null, '/login');
            window.dispatchEvent(new Event('popstate'));
        });
    }
}
