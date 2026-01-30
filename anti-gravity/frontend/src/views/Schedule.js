import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Schedule - PT Mega Kreasi Tech");
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

            <div class="container">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <a href="/home" class="nav-back" style="margin-bottom: 0px; margin-right: 15px; color: inherit; text-decoration: none;" data-link>
                        <span class="material-icons-round">arrow_back</span>
                    </a>
                    <h2 style="font-size: 1.3rem; margin: 0;">Schedule</h2>
                </div>

                <!-- Calendar Visualization Placeholder -->
                <div style="background: white; border-radius: 12px; padding: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                        <span style="font-weight: bold;">January 2026</span>
                        <div>
                            <span class="material-icons-round" style="font-size: 1.2rem;">chevron_left</span>
                            <span class="material-icons-round" style="font-size: 1.2rem;">chevron_right</span>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 0.8rem; color: #888; margin-bottom: 10px;">
                        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(7, 1fr); row-gap: 10px;">
                        <!-- Sample Days -->
                        <div class="calendar-day">1</div>
                        <div class="calendar-day">2</div>
                        <div class="calendar-day">3</div>
                        <div class="calendar-day">4</div>
                        <div class="calendar-day">5</div>
                        <div class="calendar-day">6</div>
                        <div class="calendar-day">7</div>

                        <div class="calendar-day">8</div>
                        <div class="calendar-day">9</div>
                        <div class="calendar-day">10</div>
                        <div class="calendar-day">11</div>
                        <div class="calendar-day">12</div>
                        <div class="calendar-day">13</div>
                        <div class="calendar-day">14</div>

                        <div class="calendar-day">15</div>
                        <div class="calendar-day">16</div>
                        <div class="calendar-day">17</div>
                        <div class="calendar-day">18</div>
                        <div class="calendar-day">19</div>
                        <div class="calendar-day">20</div>
                        <div class="calendar-day">21</div>

                        <div class="calendar-day">22</div>
                        <div class="calendar-day">23</div>
                        <div class="calendar-day">24</div>
                        <div class="calendar-day">25</div>
                        <div class="calendar-day">26</div>
                        <div class="calendar-day">27</div>
                        <div class="calendar-day">28</div>

                        <div class="calendar-day">
                            29
                            <span class="shift-badge shift-pagi">P</span>
                        </div>
                        <div class="calendar-day">
                            30
                            <span class="shift-badge shift-siang">S</span>
                        </div>
                        <div class="calendar-day">
                            31
                            <span class="shift-badge shift-off">O</span>
                        </div>
                    </div>
                </div>

                 <div class="footer" style="padding-top: 30px;">
                    <span>PT Mega Kreasi Tech</span>
                    <span>Since 2016</span>
                </div>
            </div>
        `;
    }
}
