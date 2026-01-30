import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Task - PT Mega Kreasi Tech");
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
                    <h2 style="font-size: 1.3rem; margin: 0;">Task</h2>
                </div>

                <!-- Tabs (Visual) -->
                <div style="display: flex; border-bottom: 1px solid #ccc; margin-bottom: 20px;">
                    <div style="padding: 10px 20px; border-bottom: 2px solid #D32F2F; color: #D32F2F; font-weight: bold;">New Task</div>
                    <div style="padding: 10px 20px; color: #888;">Completed</div>
                </div>

                <!-- Task Card 1 -->
                <div class="task-card">
                    <span class="task-tag tag-in-review">In Review</span>
                    <h4 style="margin: 0 0 5px 0; font-size: 1rem;">Perbaikan Jaringan LAN Lt. 2</h4>
                    <p style="font-size: 0.8rem; color: #555; margin-bottom: 10px;">Cek koneksi yang putus nyambung di ruang meeting.</p>
                    <div style="font-size: 0.75rem; color: #888; display: flex; align-items: center; gap: 5px;">
                        <span class="material-icons-round" style="font-size: 0.9rem;">calendar_today</span>
                        Deadline: 30 Jan 2026
                    </div>
                </div>

                <!-- Task Card 2 -->
                <div class="task-card">
                    <span class="task-tag tag-on-progress">On Progress</span>
                    <h4 style="margin: 0 0 5px 0; font-size: 1rem;">Update Software HRIS</h4>
                    <p style="font-size: 0.8rem; color: #555; margin-bottom: 10px;">Install patch terbaru v2.4 di server lokal.</p>
                    <div style="font-size: 0.75rem; color: #888; display: flex; align-items: center; gap: 5px;">
                         <span class="material-icons-round" style="font-size: 0.9rem;">calendar_today</span>
                        Deadline: 02 Feb 2026
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
