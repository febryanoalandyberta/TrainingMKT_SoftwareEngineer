import AbstractView from "./AbstractView.js";
import { AuthService } from "../services/AuthService.js";


export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Support & Emergency - PT Mega Kreasi Tech");
    }

    async getHtml() {
        const user = AuthService.getUser();
        const savedPhoto = localStorage.getItem('user_profile_photo') || null;

        return `
            <div class="header">
                 <div class="header-content">
                     <div class="logo-section">
                        <div class="logo-box">M</div>
                        <span class="company-name">PT Mega Kreasi Tech</span>
                    </div>
                     <div class="user-profile">
                        <div class="user-info">
                            <h4>${user.name}</h4>
                            <p>${user.role}</p>
                        </div>
                        <a href="/profile" data-link style="text-decoration: none; color: inherit; display: flex;">
                             ${savedPhoto
                ? `<img src="${savedPhoto}" class="avatar-img">`
                : `<span class="material-icons-round avatar">account_circle</span>`
            }
                        </a>
                    </div>
                 </div>
            </div>

            <div class="container" style="background: #F5F5F5;">
                 <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <a href="/home" class="nav-back" style="margin-bottom: 0px; margin-right: 15px; color: inherit; text-decoration: none;" data-link>
                        <span class="material-icons-round">arrow_back</span>
                    </a>
                    <h2 style="font-size: 1.3rem; margin: 0;">Support & Emergency</h2>
                </div>

                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px;">
                    
                    <a href="tel:110" style="text-decoration: none;">
                        <div class="emergency-btn">
                            <span class="material-icons-round" style="font-size: 4rem; color: white;">local_police</span>
                        </div>
                        <div style="text-align: center; margin-top: 15px; font-weight: bold; color: #D32F2F; font-size: 1.2rem;">EMERGENCY CALL (110)</div>
                    </a>

                    <div style="display: flex; gap: 15px; width: 100%;">
                         <a href="https://megakreasitech.com" target="_blank" class="menu-item-row" style="flex: 1; background: white; border-radius: 12px; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                            <span class="material-icons-round" style="color: #D32F2F;">language</span>
                            <span style="margin-left: 10px; font-weight: 500;">Website</span>
                        </a>
                    </div>
                     
                     <div style="display: flex; gap: 15px; width: 100%;">
                        <div class="menu-item-row" style="flex: 1; background: white; border-radius: 12px; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                            <span class="material-icons-round" style="color: #555;">gavel</span>
                            <span style="margin-left: 10px; font-weight: 500;">Legal</span>
                        </div>
                        <div class="menu-item-row" style="flex: 1; background: white; border-radius: 12px; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                            <span class="material-icons-round" style="color: #555;">description</span>
                            <span style="margin-left: 10px; font-weight: 500;">Terms</span>
                        </div>
                     </div>

                </div>

                 <div class="footer">
                    <span>PT Mega Kreasi Tech</span>
                    <span>Since 2016</span>
                </div>
            </div>
        `;
    }
}
