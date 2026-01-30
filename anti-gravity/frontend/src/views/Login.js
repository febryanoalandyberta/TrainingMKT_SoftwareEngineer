import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Login - PT Mega Kreasi Tech");
    }

    async getHtml() {
        return `
            <div class="container" style="background: #F5F5F5;">
                <div class="login-form">
                    <form id="loginForm">
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-input" placeholder="Email terdaftar" value="admin@mkt.com" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-input" placeholder="Password terdaftar" value="password" required>
                        </div>
                        <div class="btn-row">
                            <button type="submit" class="btn">Log in</button>
                            <button type="button" class="btn">Forgot Password</button>
                        </div>
                    </form>
                </div>
            </div>

             <div class="footer" style="position: absolute; bottom: 0; left: 0; right: 0;">
                <span>PT Mega Kreasi Tech</span>
                <span>Since 2016</span>
            </div>
        `;
    }

    execute() {
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            // Simple mock login
            history.pushState(null, null, '/home');
            window.dispatchEvent(new Event('popstate'));
        });
    }
}
