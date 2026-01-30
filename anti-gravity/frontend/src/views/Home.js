import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Home - PT Mega Kreasi Tech");
    }

    async getHtml() {
        return `
            <!-- Drawer Overlay -->
            <div id="drawer-overlay" class="drawer-overlay"></div>

            <!-- Animated Drawer Content -->
            <div id="drawer-menu" class="drawer-content">
                <div class="drawer-header-fancy">
                    <div class="drawer-avatar-large">
                        <span class="material-icons-round">person</span>
                    </div>
                    <div class="drawer-user-name">Febryano Alandy</div>
                    <div class="drawer-user-role">IT Support</div>
                </div>
                
                <div class="drawer-body">
                    <div class="drawer-label">Menu</div>
                    <a href="/profile" class="drawer-menu-item" data-link>
                        <span class="material-icons-round">account_circle</span>
                        <span>My Profile</span>
                    </a>
                    <a href="/notifications" class="drawer-menu-item" data-link>
                        <span class="material-icons-round">notifications</span>
                        <span>Notifications</span>
                        <span style="margin-left: auto; background: #D32F2F; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold;">3</span>
                    </a>
                    
                    <div class="drawer-divider"></div>
                    
                    <div class="drawer-label">Settings</div>
                    <a href="/settings" class="drawer-menu-item" data-link>
                        <span class="material-icons-round">settings</span>
                        <span>App Settings</span>
                    </a>
                    <a href="/help" class="drawer-menu-item" data-link>
                        <span class="material-icons-round">help_outline</span>
                        <span>Help & Support</span>
                    </a>
                </div>

                <div style="padding: 15px; border-top: 1px solid #eee; text-align: center;">
                    <button id="close-drawer-btn" style="width: 100%; border: none; background: #f5f5f5; padding: 10px; border-radius: 8px; color: #555; font-weight: 500; cursor: pointer;">
                        Close Menu
                    </button>
                    <div style="font-size: 0.7rem; color: #aaa; margin-top: 10px;">
                        App Version 1.0.0
                    </div>
                </div>
            </div>

            <div class="header">
                 <div id="hamburger-btn" style="cursor: pointer; align-self: flex-start;">
                    <div style="border-bottom: 2px solid #333; width: 22px; margin-bottom: 4px;"></div>
                    <div style="border-bottom: 2px solid #333; width: 22px; margin-bottom: 4px;"></div>
                    <div style="border-bottom: 2px solid #333; width: 22px;"></div>
                </div>

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
                <div class="menu-grid">
                    <a href="/attendance" class="menu-item" data-link>
                        <span class="material-icons-round menu-icon">meeting_room</span>
                        <span class="menu-label">Absen In</span>
                    </a>
                    <a href="/absen-out" class="menu-item" data-link>
                        <span class="material-icons-round menu-icon" style="transform: scaleX(-1);">meeting_room</span>
                        <span class="menu-label">Absen Out</span>
                    </a>
                    <a href="/break-in" class="menu-item" data-link>
                        <span class="material-icons-round menu-icon">free_breakfast</span>
                        <span class="menu-label">Break In</span>
                    </a>
                    <a href="/break-out" class="menu-item" data-link>
                        <span class="material-icons-round menu-icon" style="position: relative;">
                            free_breakfast
                            <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: #333;">\</span>
                        </span>
                        <span class="menu-label">Break Out</span>
                    </a>
                    <a href="/permission" class="menu-item" data-link>
                        <span class="material-icons-round menu-icon">event_busy</span>
                        <span class="menu-label">Izin</span>
                    </a>
                    <a href="/leave" class="menu-item" data-link>
                        <span class="material-icons-round menu-icon">event_note</span>
                        <span class="menu-label">Izin Cuti</span>
                    </a>
                    <a href="/schedule" class="menu-item" data-link>
                        <span class="material-icons-round menu-icon">calendar_month</span>
                        <span class="menu-label">Cek Schdule</span>
                    </a>
                    <a href="/tasks" class="menu-item" data-link>
                        <span class="material-icons-round menu-icon">assignment</span>
                        <span class="menu-label">Task</span>
                    </a>
                </div>

                <div class="support-section">
                    <a href="/support" style="text-decoration: none; color: inherit; display: flex; flex-direction: column; align-items: center;" data-link>
                        <span class="material-icons-round" style="font-size: 4rem; color: #000;">support_agent</span>
                        <span class="menu-label" style="font-size: 1.1rem; margin-top: 10px;">Support & Emergency</span>
                    </a>
                </div>
            </div>

            <div class="footer">
                <span>PT Mega Kreasi Tech</span>
                <span>Since 2016</span>
            </div>
        `;
    }

    execute() {
        const btn = document.getElementById('hamburger-btn');
        const overlay = document.getElementById('drawer-overlay');
        const menu = document.getElementById('drawer-menu');
        const closeBtn = document.getElementById('close-drawer-btn');

        function openMenu() {
            if (overlay) overlay.classList.add('open');
            if (menu) menu.classList.add('open');
        }

        function closeMenu() {
            if (overlay) overlay.classList.remove('open');
            if (menu) menu.classList.remove('open');
        }

        if (btn) btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openMenu();
        });

        if (closeBtn) closeBtn.addEventListener('click', () => {
            closeMenu();
        });

        if (overlay) overlay.addEventListener('click', () => {
            closeMenu();
        });
    }
}
