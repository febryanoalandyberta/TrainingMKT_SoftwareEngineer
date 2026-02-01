import AbstractView from "./AbstractView.js";
import { AuthService } from "../services/AuthService.js";


export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Notifikasi - PT Mega Kreasi Tech");
    }

    async getHtml() {
        const user = AuthService.getUser();
        const savedPhoto = localStorage.getItem('user_profile_photo') || null;

        // Dynamic backend URL - handle dev tunnels
        const hostname = window.location.hostname;
        const isDevTunnel = hostname.includes('devtunnels.ms') ||
            hostname.includes('ngrok.io') ||
            hostname.includes('localhost.run') ||
            hostname.includes('loca.lt');
        const backendHost = isDevTunnel ? 'localhost' : hostname;
        const backendBase = `http://${backendHost}:5000/api/v1/attendance`;

        // 1. Fetch Backend Logs (Absen/Break)
        const logsRes = await fetch(`${backendBase}/logs`).catch(() => null);
        const logs = logsRes ? (await logsRes.json()).data : [];

        // 2. Fetch Backend History (Permissions/Izin/Cuti)
        const histRes = await fetch(`${backendBase}/history`).catch(() => null);
        const history = histRes ? (await histRes.json()).data : [];

        // 3. Get Local Notifications (Immediate Feedback)
        const localNotifs = JSON.parse(localStorage.getItem('user_notifications') || '[]');

        // Combine and Sort
        // We defer to local notifications for immediate feedback. 
        // In a real app we might deduplicate based on ID or Timestamp.
        const allNotifs = [
            ...localNotifs, // Add local notifications at the top
            ...logs.map(l => {
                // Parse timestamp "29 Jan 2026 17:05:00"
                const parts = l.timestamp ? l.timestamp.split(' ') : [];
                const timeStr = parts.length > 3 ? parts[3] : '';
                const dateStr = parts.length > 2 ? parts.slice(0, 3).join(' ') : '';

                let icon = 'event';
                // Adjust icons for better visuals
                const type = l.type.toLowerCase();
                if (type.includes('in') || type.includes('masuk') || type.includes('mulai')) icon = 'login';
                else if (type.includes('out') || type.includes('pulang') || type.includes('selesai')) icon = 'logout';

                return {
                    id: l.id,
                    title: `Berhasil ${l.type}`,
                    message: `Lokasi: ${l.location || '-'}`,
                    time: timeStr,
                    date: dateStr,
                    icon: icon
                };
            }),
            ...history.map(h => ({
                id: h.id,
                title: `Status ${h.type}: ${h.status}`,
                message: `Periode: ${h.startDate} s/d ${h.endDate}`,
                time: new Date(h.submittedAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
                date: new Date(h.submittedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                icon: 'assignment_turned_in'
            }))
        ].sort((a, b) => b.id - a.id);

        let notifItemsHtml = allNotifs.length > 0 ? allNotifs.map(n => `
            <div class="notif-card" key="${n.id}">
                <div class="notif-icon-box">
                     <span class="material-icons-round" style="font-size: 2.5rem; color: #D32F2F;">${n.icon}</span>
                </div>
                <div style="flex: 1;">
                    <h4 style="margin: 0; font-size: 0.95rem;">${n.title}</h4>
                    <p style="margin: 4px 0 0 0; font-size: 0.8rem; color: #555;">${n.message}</p>
                </div>
                <div style="font-size: 0.7rem; color: #888; align-self: flex-end;">${n.date}${n.time ? ', ' + n.time : ''}</div>
            </div>
        `).join('') : '<div style="text-align:center; padding: 20px; color: #888;">Belum ada notifikasi</div>';

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
                    <h2 style="font-size: 1.3rem; margin: 0;">Notifikasi</h2>
                </div>
                
                ${notifItemsHtml}

                ${notifItemsHtml}
                
                 <div class="footer">
                    <span>PT Mega Kreasi Tech</span>
                    <span>Since 2016</span>
                </div>
            </div>
        `;
    }
    execute() {
        import("../services/NotificationService.js").then(module => {
            module.NotificationService.markAsRead();
        });
    }
}
