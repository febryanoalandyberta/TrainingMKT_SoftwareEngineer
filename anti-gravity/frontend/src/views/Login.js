import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Login - PT Mega Kreasi Tech");
    }

    async getHtml() {
        const biometricEnabled = localStorage.getItem('biometric_enabled') === 'true';

        return `
            <div class="login-container" style="background: #F8F9FA; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px;">
                <div class="login-card" style="background: white; width: 100%; max-width: 400px; padding: 40px 30px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
                    
                    <div style="text-align: center; margin-bottom: 30px;">
                        <div style="width: 60px; height: 60px; background: #D32F2F; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; color: white; font-size: 2rem; font-weight: bold; box-shadow: 0 4px 10px rgba(211, 47, 47, 0.3);">M</div>
                        <h2 style="font-size: 1.5rem; margin: 0; color: #333;">Welcome Back</h2>
                        <p style="color: #666; font-size: 0.9rem; margin-top: 5px;">Enter your credentials to continue</p>
                    </div>

                    <form id="loginForm">
                        <div class="form-group" style="margin-bottom: 20px;">
                            <label class="form-label">Email Address</label>
                            <input type="email" class="form-input" placeholder="name@company.com" value="admin@mkt.com" required style="width: 100%; padding: 12px 15px; border: 1.5px solid #EEE; border-radius: 10px; font-size: 0.95rem;">
                        </div>
                        <div class="form-group" style="margin-bottom: 25px;">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-input" placeholder="••••••••" value="password" required style="width: 100%; padding: 12px 15px; border: 1.5px solid #EEE; border-radius: 10px; font-size: 0.95rem;">
                        </div>
                        <button type="submit" class="btn" style="width: 100%; padding: 14px; background: #D32F2F; color: white; border: none; border-radius: 10px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 12px rgba(211, 47, 47, 0.2);">
                            Log In
                        </button>
                    </form>

                    ${biometricEnabled ? `
                        <div style="display: flex; align-items: center; margin: 30px 0;">
                            <div style="flex: 1; height: 1px; background: #EEE;"></div>
                            <span style="margin: 0 15px; color: #AAA; font-size: 0.8rem; font-weight: 500;">OR</span>
                            <div style="flex: 1; height: 1px; background: #EEE;"></div>
                        </div>

                        <button id="biometricBtn" class="btn-secondary" style="width: 100%; padding: 14px; background: white; color: #333; border: 1.5px solid #EEE; border-radius: 10px; font-weight: 600; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.2s;">
                            <span class="material-icons-round" style="color: #D32F2F;">fingerprint</span>
                            Login with Biometrics
                        </button>
                    ` : ''}

                    <div style="text-align: center; margin-top: 30px;">
                        <a href="/forgot-password" style="color: #666; text-decoration: none; font-size: 0.85rem; font-weight: 500;">Forgot your password?</a>
                    </div>
                </div>
            </div>

             <div class="footer" style="position: absolute; bottom: 20px; left: 0; right: 0; text-align: center;">
                <span style="color: #999; font-size: 0.8rem;">PT Mega Kreasi Tech &bull; Since 2016</span>
            </div>
        `;
    }

    execute() {
        const loginForm = document.getElementById('loginForm');
        const biometricBtn = document.getElementById('biometricBtn');

        const doLogin = () => {
            history.pushState(null, null, '/home');
            window.dispatchEvent(new Event('popstate'));
        };

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                doLogin();
            });
        }

        if (biometricBtn) {
            biometricBtn.onclick = () => {
                // Simulate biometric popup
                biometricBtn.innerHTML = '<span class="material-icons-round rotating">sync</span> Authenticatiing...';
                biometricBtn.disabled = true;

                setTimeout(() => {
                    alert('Biometric Authentication Successful!');
                    doLogin();
                }, 1500);
            };
        }
    }
}
