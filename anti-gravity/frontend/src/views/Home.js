import AbstractView from "./AbstractView.js";
import { AuthService } from "../services/AuthService.js";
import { NotificationService } from "../services/NotificationService.js";


export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Home - PT Mega Kreasi Tech");
    }

    async getHtml() {
        const user = AuthService.getUser();
        const savedPhoto = localStorage.getItem('user_profile_photo') || null;

        return `
            <!-- Profile Dropdown Menu -->
            <div id="profile-dropdown" class="profile-dropdown">
                <div class="dropdown-header">
                    <div class="dropdown-user">${user.name}</div>
                    <div class="dropdown-role">${user.role}</div>
                </div>
                <div class="dropdown-divider"></div>
                <a href="/notifications" class="dropdown-item" data-link>
                    <span class="material-icons-round">notifications</span>
                    <span>Notifications</span>
                    <span id="notif-badge-menu" class="badge-mini" style="display: none;">0</span>
                </a>
                <a href="/settings" class="dropdown-item" data-link>
                    <span class="material-icons-round">settings</span>
                    <span>App Settings</span>
                </a>
                <div class="dropdown-divider"></div>
                <a href="/profile" class="dropdown-item" data-link>
                    <span class="material-icons-round">account_circle</span>
                    <span>My Profile</span>
                </a>
            </div>

            <div class="header">
                 <div class="header-content">
                     <div class="logo-section">
                        <div class="logo-box">M</div>
                        <span class="company-name">PT Mega Kreasi Tech</span>
                    </div>
                     <div class="user-profile" id="profile-trigger">
                        <div class="user-info">
                            <h4>${user.name}</h4>
                            <p>${user.role}</p>
                        </div>
                        <div class="avatar-wrapper">
                             ${savedPhoto
                ? `<img src="${savedPhoto}" class="avatar-img">`
                : `<span class="material-icons-round avatar">account_circle</span>`
            }
                            <span id="notif-count-profile" class="notif-badge-profile" style="display: none;">0</span>
                        </div>
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
        const trigger = document.getElementById('profile-trigger');
        const dropdown = document.getElementById('profile-dropdown');
        const notifCountProfile = document.getElementById('notif-count-profile');
        const notifBadgeMenu = document.getElementById('notif-badge-menu');

        if (trigger && dropdown) {
            trigger.onclick = (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('show');
            };

            // Close when clicking outside
            document.addEventListener('click', () => {
                dropdown.classList.remove('show');
            });

            dropdown.onclick = (e) => e.stopPropagation();
        }

        // Real-time Notifications
        const updateNotifs = (count) => {
            const badgeProfile = document.getElementById('notif-count-profile');
            const badgeMenu = document.getElementById('notif-badge-menu');

            if (!badgeProfile) return;

            if (count > 0) {
                badgeProfile.style.display = 'flex';
                badgeProfile.innerText = count > 9 ? '9+' : count;

                if (badgeMenu) {
                    badgeMenu.style.display = 'flex';
                    badgeMenu.innerText = count;
                }
            } else {
                badgeProfile.style.display = 'none';
                if (badgeMenu) badgeMenu.style.display = 'none';
            }
        };

        NotificationService.subscribe(updateNotifs);

        // Clear badge when clicking 'Notifications' dropdown item
        const notifLink = dropdown.querySelector('a[href="/notifications"]');
        if (notifLink) {
            notifLink.onclick = () => NotificationService.markAsRead();
        }
    }
}
